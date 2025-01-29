"use client"
import { playfairFont } from "@/styles/font"
import React, { useState, useEffect } from "react"

const DateCounter = () => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const targetDate = new Date("2025-04-16T08:00:00Z")

		const calculateTimeLeft = () => {
			const now = new Date()
			// Convert current time to Jakarta time (UTC+7)
			const utcOffset = now.getTimezoneOffset()
			const jakartaOffset = -7 * 60 // Jakarta is UTC+7 (in minutes)
			const offsetDiff = (utcOffset + jakartaOffset) * 60 * 1000

			const difference = targetDate - now + offsetDiff

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24))
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
				const minutes = Math.floor((difference / (1000 * 60)) % 60)
				const seconds = Math.floor((difference / 1000) % 60)

				setTimeLeft({ days, hours, minutes, seconds })
			}
		}

		// Calculate immediately
		calculateTimeLeft()

		// Update every second
		const timer = setInterval(calculateTimeLeft, 1000)

		// Cleanup interval on unmount
		return () => clearInterval(timer)
	}, [])

	const TimeUnit = ({ value, label }) => (
		<div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
			<div className="text-xl font-bold text-text-primary">
				{value.toString().padStart(2, "0")}
			</div>
			<div className="text-sm italic text-text-primary mt-1">{label}</div>
		</div>
	)

	return (
		<div className={`${playfairFont.className} w-full mx-auto`}>
			<div className="flex justify-center space-x-4">
				<TimeUnit value={timeLeft.days} label="Hari" />
				<TimeUnit value={timeLeft.hours} label="Jam" />
				<TimeUnit value={timeLeft.minutes} label="Menit" />
				<TimeUnit value={timeLeft.seconds} label="Detik" />
			</div>
		</div>
	)
}

export default DateCounter
