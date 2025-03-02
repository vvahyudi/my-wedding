"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { playfairFont } from "@/styles/font"
import { useGuestBySlug } from "@/hooks/useGuests"
import Link from "next/link"
import WhatsAppButton from "@/components/WhatsAppButton"

const GuestDetailPage = () => {
	const { slug } = useParams()
	const router = useRouter()

	const { data, isLoading, isError, error } = useGuestBySlug(slug)

	if (isLoading) {
		return (
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10 text-center">
				<div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700"></div>
				<p className="mt-2 text-gray-500">Loading guest information...</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error.message || "An error occurred while fetching guest data"}
				</div>
				<button
					onClick={() => router.push("/admin/guests")}
					className="mt-4 bg-text-primary hover:bg-emerald-800 text-white py-2 px-4 rounded-md transition-colors duration-200"
				>
					Back to Guest List
				</button>
			</div>
		)
	}

	return (
		<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
			<div className="border-b pb-4 mb-6">
				<h1
					className={`${playfairFont.className} text-3xl font-bold text-text-primary`}
				>
					Guest Details
				</h1>
			</div>

			{data && data.data && (
				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-gray-50 p-4 rounded-md">
							<h2 className="text-sm font-medium text-gray-500">Name</h2>
							<p className="mt-1 text-lg font-semibold text-text-primary">
								{data.data.name}
							</p>
						</div>

						<div className="bg-gray-50 p-4 rounded-md">
							<h2 className="text-sm font-medium text-gray-500">Slug</h2>
							<p className="mt-1 text-lg font-semibold text-text-primary">
								{data.data.slug}
							</p>
						</div>

						<div className="bg-gray-50 p-4 rounded-md">
							<div className="flex justify-between items-center">
								<h2 className="text-sm font-medium text-gray-500">
									Invitation URL
								</h2>
								<button
									onClick={() => {
										navigator.clipboard.writeText(
											`${window.location.origin}/${data.data.slug}`,
										)
										alert("Invitation URL copied to clipboard!")
									}}
									className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
								>
									Copy
								</button>
							</div>
							<p className="mt-1 text-lg font-semibold text-text-primary break-all">
								{`${window.location.origin}/${data.data.slug}`}
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-50 p-4 rounded-md">
							<h2 className="text-sm font-medium text-gray-500">Address</h2>
							<p className="mt-1 text-lg font-semibold text-text-primary whitespace-pre-wrap">
								{data.data.address || "Not provided"}
							</p>
						</div>

						<div className="bg-gray-50 p-4 rounded-md">
							<h2 className="text-sm font-medium text-gray-500">Phone</h2>
							<p className="mt-1 text-lg font-semibold text-text-primary">
								{data.data.phone || "Not provided"}
							</p>
						</div>
					</div>

					<div className="bg-gray-50 p-4 rounded-md">
						<h2 className="text-sm font-medium text-gray-500">Created At</h2>
						<p className="mt-1 text-lg font-semibold text-text-primary">
							{data.data.created_at
								? new Date(data.data.created_at).toLocaleString()
								: "Unknown"}
						</p>
					</div>
				</div>
			)}

			<div className="flex flex-wrap justify-between mt-8 gap-2">
				<Link href="/admin/guests">
					<button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200">
						Back to Guest List
					</button>
				</Link>

				<div className="flex gap-2">
					<WhatsAppButton
						phone={data?.data?.phone}
						guestName={data?.data?.name}
						invitationUrl={`${window.location.origin}/${data?.data?.slug}`}
						variant="large"
					>
						Send WhatsApp
					</WhatsAppButton>

					<Link href={`/${data?.data?.slug}`} target="_blank">
						<button className="bg-text-primary hover:bg-emerald-800 text-white py-2 px-4 rounded-md transition-colors duration-200">
							View Invitation
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default GuestDetailPage
