"use client"

import React, { useState, useEffect, useRef } from "react"
import { Music, PauseCircle, PlayCircle } from "lucide-react"

const AudioPlayer = ({ audioSrc = "/audio/wedding-song.mp3" }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const audioRef = useRef(null)

	useEffect(() => {
		// Create audio element
		audioRef.current = new Audio(audioSrc)

		// Set up event listeners
		audioRef.current.addEventListener("canplaythrough", () => {
			setIsLoaded(true)
		})

		audioRef.current.addEventListener("ended", () => {
			// Loop the audio
			audioRef.current.currentTime = 0
			audioRef.current.play()
		})

		// Clean up on component unmount
		return () => {
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.src = ""
				audioRef.current.remove()
				audioRef.current = null
			}
		}
	}, [audioSrc])

	const togglePlay = () => {
		if (!audioRef.current) return

		if (isPlaying) {
			audioRef.current.pause()
		} else {
			audioRef.current.play()
		}

		setIsPlaying(!isPlaying)
	}

	return (
		<button
			onClick={togglePlay}
			disabled={!isLoaded}
			className="fixed bottom-4 right-4 z-50 flex items-center justify-center gap-2 bg-white bg-opacity-80 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 backdrop-blur-sm"
			aria-label={isPlaying ? "Pause music" : "Play music"}
		>
			{isPlaying ? (
				<PauseCircle size={24} className="text-text-primary" />
			) : (
				<PlayCircle size={24} className="text-text-primary" />
			)}
			<Music size={16} className="text-text-primary" />
		</button>
	)
}

export default AudioPlayer
