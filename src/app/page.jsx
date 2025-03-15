"use client"
import React, { useState, useEffect } from "react"
import DateCounter from "@/components/DateCounter"
import { gwendolynFont, playfairFont } from "@/styles/font"
import Link from "next/link"
import Image from "next/image"
import AutoAudioPlayer from "@/components/AutoAudioPlayer"

export default function WelcomePage() {
	const [isLoading, setIsLoading] = useState(true)
	const [hasInteracted, setHasInteracted] = useState(false)
	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-4000"

	useEffect(() => {
		// Create an audio element that we'll use for playback once user interacts
		const audio = new Audio("/audio/wedding-song.mp3")
		audio.loop = true
		audio.volume = 0.3

		// Show welcome screen after brief delay to give audio a chance to load
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2000)

		// Function to handle user interaction and start playing audio
		const handleInteraction = () => {
			setHasInteracted(true)
			audio.play().catch((err) => console.log("Could not autoplay:", err))

			// Remove event listeners after first interaction
			document.removeEventListener("click", handleInteraction)
			document.removeEventListener("touchstart", handleInteraction)
		}

		// Add event listeners for user interaction
		document.addEventListener("click", handleInteraction)
		document.addEventListener("touchstart", handleInteraction)

		return () => {
			clearTimeout(timer)
			document.removeEventListener("click", handleInteraction)
			document.removeEventListener("touchstart", handleInteraction)
			audio.pause()
		}
	}, [])

	// Preload/welcome screen
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-text-primary">
				<div className="text-center text-white p-8 max-w-md">
					<h1 className={`${gwendolynFont.className} text-5xl mb-6`}>
						Ati & Yudi
					</h1>
					<p className={`${playfairFont.className} mb-8`}>
						We're preparing our wedding invitation for you...
					</p>
					<div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="@container max-w-sm mx-auto rounded-lg shadow-2xl">
			<div className="relative h-screen w-full bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat flex flex-col">
				{/* Top-left floral decoration */}
				<div className="absolute top-0 w-full">
					<img
						src="/floral-top.png"
						alt="Floral decoration"
						className="w-full object-contain"
					/>
				</div>

				{/* Bottom-right floral decoration */}
				<div className="absolute bottom-0 w-full">
					<img
						src="/floral-bottom.png"
						alt="Floral decoration"
						className="w-full object-contain"
					/>
				</div>

				{/* Content Container */}
				<div className="relative h-full flex flex-col justify-center items-center gap-4 px-8 text-center text-text-primary">
					<h1
						className={`${playfairFont.className} text-lg font-semibold ${entranceIn}`}
					>
						PERNIKAHAN
					</h1>

					<h2
						className={`${gwendolynFont.className} font-bold text-6xl ${entranceIn}`}
					>
						Ati
					</h2>

					<span
						className={`${gwendolynFont.className} font-bold text-4xl ${entranceIn}`}
					>
						&
					</span>

					<h2
						className={`${gwendolynFont.className} font-bold text-6xl ${entranceIn}`}
					>
						Yudi
					</h2>

					<p
						className={`${playfairFont.className} text-lg font-medium bg-text-primary text-white px-4 py-1 rounded-md`}
					>
						Rabu, 16 April 2025
					</p>

					<DateCounter />
				</div>
			</div>

			{/* Only show explicit audio controls if audio playback failed after interaction */}
			{hasInteracted && (
				<AutoAudioPlayer
					audioSrc="/audio/wedding-song.mp3"
					initialVolume={0.3}
				/>
			)}
		</div>
	)
}
