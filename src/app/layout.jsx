import "@/styles/globals.css"
import Providers from "@/components/Providers"
import { Analytics } from "@vercel/analytics/next"

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
					<Analytics />
				</Providers>
			</body>
		</html>
	)
}
