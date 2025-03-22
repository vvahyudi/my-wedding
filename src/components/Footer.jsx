import { quicksandFont } from "@/styles/font"
import React from "react"

const Footer = () => {
	// Get current year dynamically
	const currentYear = new Date().getFullYear()

	return (
		<footer className="max-w-md p-4 @container mx-auto bg-text-primary">
			<div
				className={`${quicksandFont.className} text-center text-sm font-medium text-white`}
			>
				<p>© {currentYear} made with ❤️ by ahmadwahyudi</p>
			</div>
		</footer>
	)
}

export default Footer
