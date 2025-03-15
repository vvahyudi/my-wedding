"use client"

import React, { useEffect, useState } from "react"
import AutoAudioPlayer from "./AutoAudioPlayer"

export default function AudioInitializer({
	audioSrc = "/audio/wedding-song.mp3",
	initialVolume = 0.5,
}) {
	const [showContent, setShowContent] = useState(false)

	useEffect(() => {
		// Set a small delay to ensure component mount is complete
		setTimeout(() => {
			setShowContent(true)
		}, 100)
	}, [])

	return showContent ? (
		<AutoAudioPlayer audioSrc={audioSrc} initialVolume={initialVolume} />
	) : null
}
