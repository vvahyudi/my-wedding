import { Imperial_Script, Playfair_Display } from "next/font/google"

const imperialFont = Imperial_Script({ subsets: ["latin"], weight: ["400"] })
const playfairFont = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
})

export { imperialFont, playfairFont }
