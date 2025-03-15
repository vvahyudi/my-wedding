"use client"

import { useState } from "react"
import { LeafletMap } from "./LeafletMap"
export function MapContainer({
	initialVisible = false,
	buttonText = "Buka Map",
	closeButtonText = "Tutup Map",
	...mapProps
}) {
	const [isMapVisible, setIsMapVisible] = useState(initialVisible)

	return (
		<div className="w-full">
			{/* Container with flex to center the button */}
			<div className="flex justify-center mb-4">
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
						className="border rounded shadow-md"
						height={400}
						{...mapProps}
					/>
				</div>
			)}
		</div>
	)
}
