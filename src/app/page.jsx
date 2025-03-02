import { gwendolynFont, playfairFont } from "@/styles/font"
import Link from "next/link"
import Image from "next/image"
import DateCounter from "@/components/DateCounter"

export default function RootPage() {
	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-4000"

	return (
		<div className="@container max-w-sm mx-auto rounded-lg shadow-2xl">
			<div className="relative h-screen w-full bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat flex flex-col">
				{/* Top-left floral decoration */}
				<div className="absolute top-0 w-full">
					<img
						src="/floral-top.png"
						alt="Floral decoration"
						className="w-full object-contain"
					/>
				</div>

				{/* Bottom-right floral decoration */}
				<div className="absolute bottom-0 w-full">
					<img
						src="/floral-bottom.png"
						alt="Floral decoration"
						className="w-full object-contain"
					/>
				</div>

				{/* Content Container */}
				<div className="relative h-full flex flex-col justify-center items-center gap-4 px-8 text-center text-text-primary">
					<h1
						className={`${playfairFont.className} text-lg font-semibold ${entranceIn}`}
					>
						PERNIKAHAN
					</h1>

					<h2
						className={`${gwendolynFont.className} font-bold text-6xl ${entranceIn}`}
					>
						Ati
					</h2>

					<span
						className={`${gwendolynFont.className} font-bold text-4xl ${entranceIn}`}
					>
						&
					</span>

					<h2
						className={`${gwendolynFont.className} font-bold text-6xl ${entranceIn}`}
					>
						Yudi
					</h2>

					<p
						className={`${playfairFont.className} text-lg font-medium bg-text-primary text-white px-4 py-1 rounded-md`}
					>
						Rabu, 16 April 2025
					</p>

					<DateCounter />
				</div>
			</div>
		</div>
	)
}
