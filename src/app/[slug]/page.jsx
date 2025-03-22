"use client"
import DateCounter from "@/components/DateCounter"
import { gwendolynFont, playfairFont } from "@/styles/font"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useGuestBySlugQuery } from "@/hooks/useGuestComment"
import { useParams, useRouter } from "next/navigation"

export default function Home() {
	const { slug } = useParams()
	const router = useRouter()
	const { data, isLoading, error, isError } = useGuestBySlugQuery(slug)
	const [isHovered, setIsHovered] = useState(false)
	const [showNotFound, setShowNotFound] = useState(false)

	useEffect(() => {
		// Jika error atau data menunjukkan tidak ada data
		if ((isError || (data && !data.data)) && !isLoading) {
			setShowNotFound(true)
			// Redirect ke halaman utama setelah beberapa detik
			const timer = setTimeout(() => {
				router.push("/")
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [data, isError, isLoading, router])

	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-4000"
	if (isLoading) {
		return (
			<div className="@container max-w-md mx-auto rounded-lg shadow-2xl">
				<div className="flex items-center justify-center min-h-screen bg-text-primary">
					<div className="text-center text-white p-8 max-w-md">
						<h1 className={`${gwendolynFont.className} text-5xl mb-6`}>
							Ati & Yudi
						</h1>
						<p className={`${playfairFont.className} mb-8`}>
							We&apos;re preparing our wedding invitation for you...
						</p>
						<div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
					</div>
				</div>
			</div>
		)
	}
	if (showNotFound) {
		return (
			<div className="h-screen max-w-md flex flex-col items-center justify-center bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat p-4">
				<div className="bg-white/80 rounded-lg p-6 max-w-md text-center shadow-lg">
					<h1
						className={`${playfairFont.className} text-2xl font-bold text-text-primary mb-4`}
					>
						Undangan Tidak Ditemukan
					</h1>
					<p className={`${playfairFont.className} mb-6`}>
						Maaf, undangan dengan tautan ini tidak ditemukan. Anda akan
						dialihkan ke halaman utama dalam beberapa detik.
					</p>
					<Link href="/">
						<button
							className={`${playfairFont.className} text-sm flex items-center justify-center mx-auto motion-preset-pulse px-6 py-2 border-2 text-white hover:text-text-primary border-emerald-700 hover:border-emerald-100 bg-text-primary rounded-full hover:bg-emerald-100 transition-colors`}
						>
							Menuju Halaman Utama
						</button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="@container max-w-md mx-auto rounded-lg shadow-2xl">
			<div className="relative h-screen w-full bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat flex flex-col">
				{/* Top-left floral decoration */}
				<div className="absolute top-0 w-full">
					<Image
						width={100}
						height={100}
						src="/floral-top.png"
						alt="Floral decoration"
						className="w-full object-contain"
					/>
				</div>

				{/* Bottom-right floral decoration */}
				<div className="absolute bottom-0 w-full">
					<Image
						width={100}
						height={100}
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
						className={`${playfairFont.className} text-xl font-bold text-text-primary  px-4 py-1 rounded-md`}
					>
						Rabu, 16 April 2025
					</p>

					<div
						className={`flex flex-col w-full ${entranceIn} ${playfairFont.className} italic`}
					>
						<span className="text-sm">Kepada :</span>
						<span className="text-sm">Yth. Bapak/Ibu/Saudara/i</span>
						{isLoading ? (
							<div className="text-center py-4">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
							</div>
						) : data && data.data ? (
							<h1 className={`text-2xl font-extrabold italic py-2`}>
								{data.data.name}
							</h1>
						) : null}
					</div>
					<Link href="/undangan">
						<button
							className={`${playfairFont.className} text-sm flex items-center motion-preset-pulse px-2 py-2 border-2 text-white hover:text-text-primary border-emerald-700 hover:border-emerald-100 bg-text-primary rounded-full hover:bg-emerald-100 transition-colors`}
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
