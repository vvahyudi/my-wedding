import React from "react"
import Image from "next/image"
import { imperialFont, scheherazadeFont, playfairFont } from "@/styles/font"

const MainPage = () => {
	const entranceIn =
		"motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-3000"
	return (
		<div className="max-w-sm rounded-lg p-4 shadow-2xl h-full @container mx-auto bg-foreground">
			<div className="flex flex-col gap-6">
				<Image
					src="/main-info.png"
					alt="Floral decoration"
					className="w-full object-contain rounded-lg shadow-lg"
					width={800}
					height={1200}
				/>
				<div className="divider divider-text-primary"></div>
				<div className="flex w-full flex-col justify-center items-center p-4 text-center text-emerald-700 gap-6 bg-emerald-100 rounded-lg shadow-xl">
					<h1 className={`${scheherazadeFont.className} text-2xl`}>
						بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
					</h1>
					<h3 className={`${scheherazadeFont.className} text-xl/9`}>
						وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا
						لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً
						ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ
					</h3>
					<h3 className={`${playfairFont.className} italic text-sm`}>
						Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
						untukmu istri-istri dari jenismu sendiri supaya kamu cenderung dan
						merasa tenteram kepadanya dan dijadikan-Nya di antaramu rasa kasih
						dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
						tanda-tanda bagi kaum yang berpikir.
					</h3>
					<h3 className={`${playfairFont.className} italic font-bold text-sm`}>
						Ar-Rum (30:21)
					</h3>
				</div>
				<div className="flex flex-col w-full text-center items-center text-text-primary gap-6 bg-white rounded-lg shadow-md p-6">
					<h1 className={`${scheherazadeFont.className} text-xl`}>
						ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
					</h1>
					<h3 className={`${playfairFont.className} text-sm`}>
						Dengan memohon Rahmat <span className="italic">Allah ﷻ</span>, Kami
						bermaksud menyelenggarakan akad pernikahan putra-putri kami
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
						<h3 className={`${imperialFont.className} text-4xl `}>Jumaati</h3>
						<span className="text-sm">
							Putri Ke-1 Bpk. Abbasi & Ibu Nafsiyah
						</span>
					</div>
					<h3 className={`${imperialFont.className} text-6xl`}>&</h3>
					<div
						className={`flex flex-col items-center text-center text-text-primary ${playfairFont.className} italic`}
					>
						<Image
							src={"/avatar-men.png"}
							alt="Avatar Men"
							width={150}
							height={150}
						/>
						<h3 className={`${imperialFont.className} text-4xl `}>
							Ahmad Wahyudi
						</h3>
						<span className="text-sm">
							Putra Ke-2 Bpk. Ach. Amam & Ibu Raudatul Jannah
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage
