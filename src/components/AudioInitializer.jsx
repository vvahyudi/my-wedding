"use client"

import React, { useState, useEffect } from "react"
import AutoAudioPlayer from "./AutoAudioPlayer"

export default function AudioInitializer({
	audioSrc = "/audio/wedding-song.mp3",
	initialVolume = 0.5,
}) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted ? (
		<AutoAudioPlayer audioSrc={audioSrc} initialVolume={initialVolume} />
	) : null
}
