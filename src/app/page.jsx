import { imperialFont, playfairFont } from "@/styles/font"
export default function Home() {
	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
	return (
		// <div className="@container mx-auto">
		// 	<div className="flex h-screen bg-bg-front bg-cover flex-col justify-center items-center text-text-primary gap-4">
		// 		<h1
		// 			className={`${playfairFont.className} text-base font-bold`}
		// 		>
		// 			UNDANGAN PERNIKAHAN
		// 		</h1>
		// 		<h1
		// 			className={`text-6xl  font-bold  ${imperialFont.className} motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md`}
		// 		>
		// 			Yati
		// 		</h1>
		// 		<h1
		// 			className={`text-4xl font-bold ${imperialFont.className} motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md`}
		// 		>
		// 			&
		// 		</h1>
		// 		<h1
		// 			className={`text-6xl font-bold ${imperialFont.className} motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md`}
		// 		>
		// 			Yudi
		// 		</h1>
		// 		<h1
		// 			className={`${playfairFont.className} motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md text-base font-bold`}
		// 		>
		// 			Rabu, 16 April 2025
		// 		</h1>
		// 		<button
		// 			className={`motion-preset-pulse ${playfairFont.className} btn btn-sm bg-transparent border-text-primary text-text-primary`}
		// 		>
		// 			Buka Undangan{" "}
		// 		</button>
		// 	</div>
		// </div>

		<div className="relative h-screen w-full bg-white">
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
			<div className="relative h-full flex flex-col justify-center items-center gap-6 px-8 text-center text-emerald-700">
				<h1
					className={`${playfairFont.className} text-lg font-semibold ${entranceIn}`}
				>
					UNDANGAN PERNIKAHAN
				</h1>

				<h2 className={`${imperialFont.className} text-6xl ${entranceIn}`}>
					Yati
				</h2>

				<span className={`${imperialFont.className} text-4xl ${entranceIn}`}>
					&
				</span>

				<h2 className={`${imperialFont.className} text-6xl ${entranceIn}`}>
					Yudi
				</h2>

				<p className={`${playfairFont.className} text-lg font-medium `}>
					Rabu, 16 April 2025
				</p>

				<button
					className={`${playfairFont.className} motion-preset-pulse mt-4 px-6 py-2 border-2 border-emerald-700  rounded-full hover:bg-emerald-50 transition-colors`}
				>
					Buka Undangan
				</button>
			</div>
		</div>
	)
}
