import "@/styles/globals.css"
import Providers from "@/components/Providers"

export const metadata = {
	title: "Ati & Yudi Wedding Invitation",
	description: "Ati & Yudi Wedding Invitation",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
