"use client"

import { useState } from "react"
import { LeafletMap } from "./LeafletMap"

export function MapContainer({
	initialVisible = false,
	buttonText = "Buka Map",
	closeButtonText = "Tutup Map",
	center = [-7.084052705527449, 113.67765395485284], // Koordinat default
	...mapProps
}) {
	const [isMapVisible, setIsMapVisible] = useState(initialVisible)

	const handleGetDirections = () => {
		const [lat, lng] = center
		const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
		window.open(googleMapsUrl, "_blank")
	}

	return (
		<div className="w-full">
			{/* Container with flex to center the button */}
			<div className="flex justify-center mb-4 gap-4">
				<button
					onClick={() => setIsMapVisible(!isMapVisible)}
					className="px-6 py-2 bg-text-primary text-white rounded-md hover:bg-text-primary transition-colors"
				>
					{isMapVisible ? closeButtonText : buttonText}
				</button>
			</div>

			{isMapVisible && (
				<div className="transition-all duration-300 ease-in-out">
					<LeafletMap
						className=" rounded shadow-md border-2 border-text-primary"
						height={400}
						center={center}
						{...mapProps}
					/>
				</div>
			)}
			{isMapVisible && (
				<button
					onClick={handleGetDirections}
					className="px-6 my-4 py-2 bg-text-primary text-white rounded-md hover:bg-text-primary/95 transition-colors"
				>
					Rute Ke Lokasi
				</button>
			)}
		</div>
	)
}
