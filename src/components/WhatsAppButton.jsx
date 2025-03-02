"use client"

import React, { useState } from "react"

/**
 * WhatsApp button component with phone validation and message customization
 */
const WhatsAppButton = ({
	phone,
	guestName,
	invitationUrl,
	className = "",
	variant = "button",
	children,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [message, setMessage] = useState(
		`Assalamu'alaikum Wr. Wb.

Kepada Yth. ${guestName}

Dengan segala hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami. Silakan kunjungi link berikut untuk informasi lengkap:

${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.

Wassalamu'alaikum Wr. Wb.`,
	)

	// Sanitize phone number - remove any non-digit characters
	const sanitizePhone = (phoneNumber) => {
		if (!phoneNumber) return ""

		// Ensure phoneNumber is a string
		const phoneStr = String(phoneNumber)

		// Remove all non-digit characters
		let cleaned = phoneStr.replace(/\D/g, "")

		// If it doesn't start with +, add country code if needed
		if (!phoneStr.startsWith("+") && !cleaned.startsWith("62")) {
			// If it starts with 0, replace with 62
			if (cleaned.startsWith("0")) {
				cleaned = "62" + cleaned.substring(1)
			} else {
				cleaned = "62" + cleaned
			}
		}

		return cleaned
	}

	const handleWhatsAppClick = (e) => {
		if (!phone) {
			e.preventDefault()
			alert("No phone number available for this guest")
			return
		}

		// If it's a small button, directly open WhatsApp
		if (variant === "button") {
			const cleanedPhone = sanitizePhone(phone)
			window.open(
				`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`,
				"_blank",
			)
		} else {
			// Open modal for customization
			setIsModalOpen(true)
		}
	}

	const handleSendMessage = () => {
		const cleanedPhone = sanitizePhone(phone)
		window.open(
			`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`,
			"_blank",
		)
		setIsModalOpen(false)
	}

	return (
		<>
			{variant === "button" ? (
				<button
					onClick={handleWhatsAppClick}
					className={`bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors ${className}`}
					title={
						phone ? "Send WhatsApp invitation" : "No phone number available"
					}
					disabled={!phone}
				>
					{children || "WhatsApp"}
				</button>
			) : (
				<button
					onClick={handleWhatsAppClick}
					className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 ${className}`}
					disabled={!phone}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
						<path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
						<path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
						<path d="M9.5 15.5a5 5 0 0 0 5 0" />
					</svg>
					{children || "Send WhatsApp"}
				</button>
			)}

			{/* Modal for message customization */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-lg w-full p-6">
						<h3 className="text-lg font-bold text-text-primary mb-4">
							Send WhatsApp Invitation
						</h3>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary bg-gray-100"
								value={phone || ""}
								readOnly
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Message
							</label>
							<textarea
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
								rows="10"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
						</div>

						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleSendMessage}
								className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default WhatsAppButton
