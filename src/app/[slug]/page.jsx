"use client"
import DateCounter from "@/components/DateCounter"
import { gwendolynFont, playfairFont } from "@/styles/font"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useGuestBySlugQuery } from "@/hooks/useGuestComment"
import { useParams } from "next/navigation"

export default function Home() {
	const { slug } = useParams()
	const { data, isLoading, refetch } = useGuestBySlugQuery(slug)

	const [isHovered, setIsHovered] = useState(false)
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
						UNDANGAN PERNIKAHAN
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
						className={`${playfairFont.className} text-lg font-medium bg-text-primary `}
					>
						Rabu, 16 April 2025
					</p>
					<DateCounter />

					<div
						className={`flex flex-col w-full ${entranceIn} ${playfairFont.className} italic`}
					>
						<span className="text-sm">Kepada :</span>
						<span className="text-sm">Yth. Bapak/Ibu/Saudara/i</span>
						{isLoading ? (
							<div className="text-center py-4">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
							</div>
						) : (
							<h1 className={`text-xl font-extrabold italic`}>
								{data.data.name}
							</h1>
						)}
					</div>
					<Link href="/main">
						<button
							className={`${playfairFont.className} text-sm flex items-center motion-preset-pulse px-6 py-2 border-2 text-white hover:text-text-primary border-emerald-700 hover:border-emerald-100 bg-text-primary rounded-full hover:bg-emerald-100 transition-colors`}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<Image
								src={isHovered ? `/mail_heart.svg` : `/mail_heart_white.svg`}
								width={20}
								height={20}
								alt="Icons by https://unicornicons.com"
							/>{" "}
							Buka Undangan
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
