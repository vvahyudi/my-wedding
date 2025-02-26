import React from "react"
import Image from "next/image"
import { gwendolynFont, scheherazadeFont, playfairFont } from "@/styles/font"
import { Map, MapPinned } from "lucide-react"
import CommentSection from "@/components/CommentSection"

const MainPage = () => {
	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-3000"
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
						Kami mohon do'a dan restu atas pernikahan kami
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
							Putra kedua Bpk. Ach. Amam & Ibu Raudatul Jannah
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
								className={`${playfairFont.className} text-base font-semibold bg-text-primary`}
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
								className={`${playfairFont.className} text-base font-semibold bg-text-primary`}
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

							<button className="flex gap-1 w-32 justify-center bg-text-primary text-white rounded-lg p-2 hover:scale-110 focus:scale-110 transition-transform shadow-lg">
								<Map />
								<span className={`${playfairFont.className} `}>Buka Map</span>
							</button>
						</div>
					</div>
				</div>
				<CommentSection />
			</div>
		</div>
	)
}

export default MainPage
