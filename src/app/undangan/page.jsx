"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { gwendolynFont, scheherazadeFont, playfairFont } from "@/styles/font"
import { Map, MapPinned } from "lucide-react"
import CommentSection from "@/components/CommentSection"
import { MapContainer } from "@/components/map"

const MainPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		// Show welcome screen after brief delay to give audio a chance to load
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2000)
	}, [])

	const [markers, setMarkers] = useState([
		{
			position: [-7.084052705527449, 113.67765395485284],
			title: "Pernikahan Ati & Yudi",
		},
	])
	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng
		setMarkers([
			...markers,
			{
				position: [lat, lng],
				title: `Marker ${markers.length + 1}`,
			},
		])
	}
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
	return (
		<div className="max-w-md rounded-lg p-4 shadow-xl h-full @container mx-auto bg-foreground">
			<div className="flex flex-col gap-6">
				<Image
					src="/main-info.png"
					alt="Floral decoration"
					className="w-full object-contain rounded-lg shadow-xl"
					width={800}
					height={1200}
				/>

				<div className="flex w-full flex-col justify-center items-center p-4 text-center text-emerald-700 gap-6  rounded-lg shadow-xl bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat">
					<h1 className={`${scheherazadeFont.className} text-2xl`}>
						بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
					</h1>
					<h3 className={`${scheherazadeFont.className} text-xl/9`}>
						وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا
						لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً
						ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ
					</h3>
					<h3 className={`${playfairFont.className} italic text-base`}>
						Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
						untukmu istri-istri dari jenismu sendiri supaya kamu cenderung dan
						merasa tenteram kepadanya dan dijadikan-Nya di antaramu rasa kasih
						dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
						tanda-tanda bagi kaum yang berpikir.
					</h3>
					<h3
						className={`${playfairFont.className} italic font-bold text-base`}
					>
						Ar-Rum (30:21)
					</h3>
				</div>
				<div className="flex flex-col w-full text-center items-center text-text-primary gap-6 rounded-lg shadow-xl p-6 bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat">
					<h1 className={`${scheherazadeFont.className} text-xl`}>
						ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
					</h1>
					<h3 className={`${playfairFont.className} text-base`}>
						Kami mohon do&apos;a dan restu atas pernikahan kami
					</h3>
					<div
						className={`flex flex-col items-center text-center  ${playfairFont.className} italic`}
					>
						<Image
							src={"/avatar-women.png"}
							alt="Avatar Women"
							width={150}
							height={150}
						/>
						<h3 className={`${gwendolynFont.className} font-bold text-4xl `}>
							Jumaati
						</h3>
						<span className="text-base">
							Putri pertama Bpk. Abbasi & Ibu Nafsiyah
						</span>
					</div>
					<h3 className={`${gwendolynFont.className} font-bold text-6xl`}>&</h3>
					<div
						className={`flex flex-col items-center text-center text-text-primary ${playfairFont.className} italic`}
					>
						<Image
							src={"/avatar-men.png"}
							alt="Avatar Men"
							width={150}
							height={150}
						/>
						<h3 className={`${gwendolynFont.className} font-bold text-4xl `}>
							Ahmad Wahyudi
						</h3>
						<span className="text-base">
							Putra kedua Bpk. Ach. Amam & Ibu Srf. Raudatul Jannah Al-Khered
						</span>
					</div>
				</div>
				<div className="flex flex-col w-full items-center text-text-primary rounded-lg shadow-xl p-6 bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat">
					<h1 className={`${gwendolynFont.className} font-bold text-6xl`}>
						Acara
					</h1>
					<p
						className={`${playfairFont.className} text-base italic font-semibold text-center`}
					>
						Kami bermaksud mengundang saudara(i) sekalian untuk hadir dalam
						acara pernikahan kami yang insya Allah akan dilaksanakan pada:
					</p>
					<div className="flex flex-col gap-6 pt-6">
						<div className="flex flex-col text-center items-center">
							<h3 className={`${gwendolynFont.className} font-bold text-4xl`}>
								Akad Nikah
							</h3>
							<p
								className={`${playfairFont.className} text-base font-semibold text-text-primary`}
							>
								Rabu, 16 April 2025
							</p>
							<p
								className={`${playfairFont.className} text-base font-semibold `}
							>
								Pukul 08.00 WIB - Selesai
							</p>
						</div>
						<div className="flex flex-col text-center items-center">
							<h3 className={`${gwendolynFont.className} font-bold text-4xl`}>
								Resepsi Pernikahan
							</h3>
							<p
								className={`${playfairFont.className} text-base font-semibold text-text-primary`}
							>
								Rabu, 16 April 2025
							</p>
							<p
								className={`${playfairFont.className} text-base font-semibold `}
							>
								Pukul 10.00 WIB - Selesai
							</p>
						</div>
						<div className="flex flex-col text-center items-center gap-2">
							<MapPinned className="h-6 w-6" />
							<h3 className={`${playfairFont.className} font-bold text-xl`}>
								Lokasi
							</h3>
							<p
								className={`${playfairFont.className} text-base font-semibold`}
							>
								Dsn. Pangelen, Ds. Prenduan, Kec. Pragaan, Kab. Sumenep
							</p>
							<Map />

							<MapContainer
								buttonText="Buka Map"
								closeButtonText="Tutup Map"
								center={[-7.084052705527449, 113.67765395485284]}
								zoom={13}
								markers={markers}
								onClick={handleMapClick}
							/>
						</div>
					</div>
				</div>
				<CommentSection />
			</div>
		</div>
	)
}

export default MainPage
