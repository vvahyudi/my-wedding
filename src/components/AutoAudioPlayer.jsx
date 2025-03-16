"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

const AutoAudioPlayer = ({
	audioSrc = "/audio/wedding-song.mp3",
	initialVolume = 0.5,
	showControls = true,
}) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const audioRef = useRef(null)
	const playAttemptRef = useRef(false)
	const interactionEvents = [
		"click",
		"touchstart",
		"keydown",
		"scroll",
		"mousemove",
	]

	// Function to attempt playing audio - wrapped in useCallback
	const playAudio = useCallback(() => {
		if (!audioRef.current || playAttemptRef.current) return

		playAttemptRef.current = true

		const playPromise = audioRef.current.play()
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					setIsPlaying(true)
					console.log("Audio playing successfully")
					// Remove event listeners since we've succeeded
					removeEventListeners()
				})
				.catch((error) => {
					console.log("Autoplay prevented:", error)
					// Reset flag so we can try again on next user interaction
					playAttemptRef.current = false
					setIsPlaying(false)
				})
		}
	}, []) // Empty dependency array as it only uses refs and setters

	// Set up and remove event listeners for user interaction - wrapped in useCallback
	const setupEventListeners = useCallback(() => {
		interactionEvents.forEach((event) => {
			document.addEventListener(event, playAudio, { once: true })
		})
	}, [playAudio, interactionEvents])

	const removeEventListeners = useCallback(() => {
		interactionEvents.forEach((event) => {
			document.removeEventListener(event, playAudio)
		})
	}, [playAudio, interactionEvents])

	useEffect(() => {
		// Create audio element
		audioRef.current = new Audio(audioSrc)
		audioRef.current.loop = true
		audioRef.current.volume = initialVolume

		// When component mounts, try to play immediately
		// (this will likely fail on most browsers but we try anyway)
		playAudio()

		// Set up event listeners to attempt playing after user interaction
		setupEventListeners()

		// This is a fallback for browsers that block autoplay
		// We'll try to play the audio once more after a short delay
		const delayedPlayAttempt = setTimeout(() => {
			if (!isPlaying) {
				playAudio()
			}
		}, 1000)

		// Clean up on unmount
		return () => {
			clearTimeout(delayedPlayAttempt)
			removeEventListeners()

			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.src = ""
				audioRef.current = null
			}
		}
	}, [
		audioSrc,
		initialVolume,
		playAudio,
		setupEventListeners,
		removeEventListeners,
		isPlaying,
	])

	// Toggle mute/unmute
	const toggleSound = () => {
		if (!audioRef.current) return

		if (!isPlaying) {
			// Try playing again if it's not playing
			playAudio()
		} else {
			// Toggle mute/unmute if already playing
			audioRef.current.muted = !audioRef.current.muted
			setIsMuted(!isMuted)
		}
	}

	// Hidden audio player without controls if showControls is false
	if (!showControls) {
		return null
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

export default AutoAudioPlayer
