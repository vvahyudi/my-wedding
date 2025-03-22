"use client"

import { useEffect, useRef, useState } from "react"
import "leaflet/dist/leaflet.css"

const classNames = (...classes) => classes.filter(Boolean).join(" ")

export function LeafletMap({
	center = [-7.084052705527449, 113.67765395485284], // Koordinat baru
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

	useEffect(() => {
		let mapInstance = null

		const initializeMap = async () => {
			try {
				const L = (await import("leaflet")).default

				// Fix for marker icons
				delete L.Icon.Default.prototype._getIconUrl
				L.Icon.Default.mergeOptions({
					iconRetinaUrl: "/leaflet/marker-icon-2x.png",
					iconUrl: "/leaflet/marker-icon.png",
					shadowUrl: "/leaflet/marker-shadow.png",
				})

				if (!mapRef.current) return

				// Inisialisasi peta jika belum ada
				if (!mapInstanceRef.current) {
					mapInstance = L.map(mapRef.current).setView(center, zoom)
					mapInstanceRef.current = mapInstance

					L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
						maxZoom: 19,
					}).addTo(mapInstance)

					markerLayerRef.current = L.layerGroup().addTo(mapInstance)

					if (onClick) {
						mapInstance.on("click", (e) => {
							onClick(e)
						})
					}

					setIsMapReady(true)
				}
			} catch (error) {
				console.error("Failed to initialize Leaflet map:", error)
			}
		}

		initializeMap()

		// Cleanup saat komponen di-unmount
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove()
				mapInstanceRef.current = null
				markerLayerRef.current = null
			}
		}
	}, [center, zoom, onClick])

	useEffect(() => {
		if (mapInstanceRef.current) {
			mapInstanceRef.current.setView(center, zoom)
		}
	}, [center, zoom])

	useEffect(() => {
		const updateMarkers = async () => {
			if (!isMapReady || !markerLayerRef.current) return

			const L = (await import("leaflet")).default
			markerLayerRef.current.clearLayers() // Hapus semua marker sebelumnya

			markers.forEach((marker) => {
				const { position, title } = marker
				const [lat, lng] = Array.isArray(position)
					? position
					: [position.lat, position.lng]

				// Tambahkan marker baru
				L.marker([lat, lng], {
					icon: L.icon({
						iconUrl: "/leaflet/marker-icon.png",
						iconRetinaUrl: "/leaflet/marker-icon-2x.png",
						shadowUrl: "/leaflet/marker-shadow.png",
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41],
					}),
				})
					.bindPopup(title || `Marker at ${lat}, ${lng}`)
					.addTo(markerLayerRef.current)
					.openPopup()
			})
		}

		updateMarkers()
	}, [markers, isMapReady])

	useEffect(() => {
		if (mapInstanceRef.current) {
			setTimeout(() => {
				mapInstanceRef.current.invalidateSize()
			}, 100)
		}
	}, [className])

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
