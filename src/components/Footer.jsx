import { quicksandFont } from "@/styles/font"
import React from "react"

const Footer = () => {
	// Get current year dynamically
	const currentYear = new Date().getFullYear()

	return (
		<div className="max-w-sm p-4 h-full @container mx-auto bg-text-primary">
			<footer
				className={`${quicksandFont.className} text-center text-sm font-medium text-white`}
			>
				<p>© {currentYear} made with ❤️ by ahmadwahyudi</p>
			</footer>
		</div>
	)
}

export default Footer
