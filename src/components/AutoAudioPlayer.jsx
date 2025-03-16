"use client"

import React, { useState, useEffect, useRef } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

const AutoAudioPlayer = ({
	audioSrc = "/audio/wedding-song.mp3",
	initialVolume = 0.5,
	showControls = true,
}) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const audioRef = useRef(null)

	useEffect(() => {
		// Ensure audioRef.current is initialized before accessing properties
		if (!audioRef.current) {
			audioRef.current = new Audio(audioSrc)
		}

		const audio = audioRef.current
		audio.loop = true
		audio.volume = initialVolume

		const playAudio = () => {
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false))
		}

		// Set up interaction events for autoplay
		const interactionEvents = ["click", "touchstart", "keydown", "scroll"]
		const enableAudio = () => {
			playAudio()
			interactionEvents.forEach((event) =>
				document.removeEventListener(event, enableAudio),
			)
		}

		interactionEvents.forEach((event) =>
			document.addEventListener(event, enableAudio),
		)

		return () => {
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.src = ""
			}
			interactionEvents.forEach((event) =>
				document.removeEventListener(event, enableAudio),
			)
		}
	}, [audioSrc, initialVolume])

	// Toggle mute/unmute
	const toggleSound = () => {
		const audio = audioRef.current
		if (!audio) return

		if (!isPlaying) {
			audio.play()
			setIsPlaying(true)
			setIsMuted(false)
		} else {
			audio.muted = !audio.muted
			setIsMuted(!isMuted)
		}
	}

	if (!showControls) return null

	return (
		<button
			onClick={toggleSound}
			className="fixed bottom-4 right-4 z-50 flex items-center justify-center gap-2 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300"
			aria-label={isPlaying && !isMuted ? "Mute music" : "Play music"}
		>
			{isPlaying && !isMuted ? (
				<Volume2 size={20} className="text-text-primary" />
			) : (
				<VolumeX size={20} className="text-text-primary" />
			)}
			<Music size={16} className="text-text-primary" />
		</button>
	)
}

export default AutoAudioPlayer
