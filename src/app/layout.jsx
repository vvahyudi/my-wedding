import "@/styles/globals.css"
import Providers from "@/components/Providers"
import { Analytics } from "@vercel/analytics/next"
import AutoAudioPlayer from "@/components/AutoAudioPlayer"
import Footer from "@/components/Footer"

export const metadata = {
	title: "Ati & Yudi Wedding Invitation",
	description: "Ati & Yudi Wedding Invitation",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<Providers>
					{children}
					<AutoAudioPlayer
						audioSrc="/audio/wedding-song.mp3"
						initialVolume={0.3}
					/>
					<Analytics />
				</Providers>
				<Footer />
			</body>
		</html>
	)
}
