import "@/styles/globals.css"

export const metadata = {
	title: "Yati & Yudi Wedding Invitation",
	description: "Yati & Yudi Wedding Invitation",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	)
}
