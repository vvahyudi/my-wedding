import {
	Imperial_Script,
	Playfair_Display,
	Noto_Sans_Arabic,
	Scheherazade_New,
	Gwendolyn,
} from "next/font/google"

const imperialFont = Imperial_Script({ subsets: ["latin"], weight: ["400"] })
const playfairFont = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["italic", "normal"],
})
const notoArabicFont = Noto_Sans_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700", "800", "900"],
})
const scheherazadeFont = Scheherazade_New({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700"],
})
const gwendolynFont = Gwendolyn({
	subsets: ["latin"],
	weight: ["400", "700"],
})

export {
	imperialFont,
	playfairFont,
	notoArabicFont,
	scheherazadeFont,
	gwendolynFont,
}
