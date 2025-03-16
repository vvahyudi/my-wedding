"use client"

import React, { useState, useEffect, useRef } from "react"
import { Music, PauseCircle, PlayCircle } from "lucide-react"

const AudioPlayer = ({ audioSrc = "/audio/wedding-song.mp3" }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const audioRef = useRef(new Audio(audioSrc))

	useEffect(() => {
		const audio = audioRef.current
		audio.loop = true

		// Event listener for when audio is ready
		const handleCanPlay = () => setIsLoaded(true)
		const handleEnded = () => {
			audio.currentTime = 0
			audio.play()
		}

		audio.addEventListener("canplaythrough", handleCanPlay)
		audio.addEventListener("ended", handleEnded)

		return () => {
			audio.pause()
			audio.src = ""
			audio.removeEventListener("canplaythrough", handleCanPlay)
			audio.removeEventListener("ended", handleEnded)
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
