"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

const SimpleAudioPlayer = ({ audioSrc = "/audio/wedding-song.mp3" }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [autoplayAttempted, setAutoplayAttempted] = useState(false)
	const audioRef = useRef(null)

	// Function to attempt autoplay - wrapped in useCallback
	const attemptAutoplay = useCallback(() => {
		if (!audioRef.current || autoplayAttempted) return

		// Set autoplay attempted flag
		setAutoplayAttempted(true)

		// Attempt to play
		const playPromise = audioRef.current.play()

		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					// Autoplay started successfully
					setIsPlaying(true)
				})
				.catch(() => {
					// Autoplay was prevented by browser
					setIsPlaying(false)
				})
		}
	}, [autoplayAttempted])

	useEffect(() => {
		audioRef.current = new Audio(audioSrc)

		// Set initial volume
		audioRef.current.volume = 0.5

		// Set audio to loop
		audioRef.current.loop = true

		// First autoplay attempt when component mounts
		attemptAutoplay()

		// Set up event listeners for user interaction to enable autoplay
		const handleUserInteraction = () => {
			if (!isPlaying) {
				attemptAutoplay()
			}
		}

		// These events are likely to indicate user interaction
		document.addEventListener("click", handleUserInteraction)
		document.addEventListener("touchstart", handleUserInteraction)
		document.addEventListener("keydown", handleUserInteraction)
		document.addEventListener("scroll", handleUserInteraction)

		// Clean up on unmount
		return () => {
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current = null
			}

			document.removeEventListener("click", handleUserInteraction)
			document.removeEventListener("touchstart", handleUserInteraction)
			document.removeEventListener("keydown", handleUserInteraction)
			document.removeEventListener("scroll", handleUserInteraction)
		}
	}, [audioSrc, isPlaying, attemptAutoplay])

	const toggleSound = () => {
		if (!audioRef.current) return

		if (!isPlaying) {
			// Start playing if currently paused
			audioRef.current.play()
			setIsPlaying(true)
			setIsMuted(false)
		} else {
			// Toggle mute/unmute if playing
			audioRef.current.muted = !audioRef.current.muted
			setIsMuted(!isMuted)
		}
	}

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

export default SimpleAudioPlayer
