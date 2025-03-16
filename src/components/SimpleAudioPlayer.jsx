"use client"

import React, { useState, useEffect, useRef } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

const SimpleAudioPlayer = ({ audioSrc = "/audio/wedding-song.mp3" }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [autoplayAttempted, setAutoplayAttempted] = useState(false)
	const audioRef = useRef(new Audio(audioSrc))

	useEffect(() => {
		const audio = audioRef.current
		audio.loop = true
		audio.volume = 0.5

		const playAudio = () => {
			if (autoplayAttempted) return

			setAutoplayAttempted(true)
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false))
		}

		const interactionEvents = ["click", "touchstart", "keydown", "scroll"]
		interactionEvents.forEach((event) =>
			document.addEventListener(event, playAudio, { once: true }),
		)

		return () => {
			audio.pause()
			audio.src = ""
			interactionEvents.forEach((event) =>
				document.removeEventListener(event, playAudio),
			)
		}
	}, [audioSrc, autoplayAttempted])

	const toggleSound = () => {
		const audio = audioRef.current
		if (!isPlaying) {
			audio.play()
			setIsPlaying(true)
			setIsMuted(false)
		} else {
			audio.muted = !audio.muted
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
