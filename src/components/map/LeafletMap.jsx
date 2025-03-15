"use client"

import { useEffect, useRef, useState } from "react"
import "leaflet/dist/leaflet.css"

// Simple utility function to merge classNames
const classNames = (...classes) => classes.filter(Boolean).join(" ")

export function LeafletMap({
	center = [51.505, -0.09], // Default to London [lat, lng]
	zoom = 13,
	markers = [],
	onClick,
	height = "400px",
	className,
	...props
}) {
	const mapRef = useRef(null)
	const mapInstanceRef = useRef(null)
	const markerLayerRef = useRef(null)
	const [isMapReady, setIsMapReady] = useState(false)

	// Initialize the map when the component mounts
	useEffect(() => {
		// Dynamic import to avoid SSR issues
		const initializeMap = async () => {
			// Import Leaflet dynamically to avoid SSR issues
			const L = (await import("leaflet")).default

			// Fix the icon paths issue in Leaflet
			delete L.Icon.Default.prototype._getIconUrl
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: "/leaflet/marker-icon-2x.png",
				iconUrl: "/leaflet/marker-icon.png",
				shadowUrl: "/leaflet/marker-shadow.png",
			})
			if (!mapRef.current) return

			// Create map if it doesn't exist
			if (!mapInstanceRef.current) {
				mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom)

				// Add tile layer (OpenStreetMap)
				L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					maxZoom: 19,
				}).addTo(mapInstanceRef.current)

				// Create a layer group for markers
				markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current)

				// Add click event handler
				if (onClick) {
					mapInstanceRef.current.on("click", (e) => {
						onClick(e)
					})
				}

				setIsMapReady(true)
			}
		}
		initializeMap()

		// Cleanup when component unmounts
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove()
				mapInstanceRef.current = null
				markerLayerRef.current = null
			}
		}
	}, [])

	// Update map center and zoom when props change
	useEffect(() => {
		if (!mapInstanceRef.current) return

		mapInstanceRef.current.setView(center, zoom)
	}, [center, zoom])

	// Update markers when they change
	useEffect(() => {
		const updateMarkers = async () => {
			if (!isMapReady || !markerLayerRef.current) return

			const L = (await import("leaflet")).default

			// Clear existing markers
			markerLayerRef.current.clearLayers()

			// Add new markers
			markers.forEach((marker) => {
				const { position, title } = marker
				const [lat, lng] = Array.isArray(position)
					? position
					: [position.lat, position.lng]
				L.marker([lat, lng])
					.bindPopup(title || `Marker at ${lat}, ${lng}`)
					.addTo(markerLayerRef.current)
			})
		}
		updateMarkers()
	}, [markers, isMapReady])

	// When map container is resized, we need to invalidate the map size
	useEffect(() => {
		if (mapInstanceRef.current) {
			// Needed to fix map display issues when showing/hiding
			setTimeout(() => {
				mapInstanceRef.current.invalidateSize()
			}, 100)
		}
	}, [className]) // This will run when className changes (which might indicate visibility changes)

	return (
		<div
			className={classNames("relative rounded-lg overflow-hidden", className)}
			{...props}
		>
			<div
				ref={mapRef}
				className="w-full h-full"
				style={{ height: typeof height === "number" ? `${height}px` : height }}
			/>
		</div>
	)
}
