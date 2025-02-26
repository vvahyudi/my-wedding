"use client"

import React, { useState } from "react"
import { playfairFont, gwendolynFont } from "@/styles/font"
import { useCommentsListQuery } from "@/hooks/useGuestComment"
import { useMutation } from "@tanstack/react-query"
import { postComment } from "@/utils/api"

// Helper function to get initials from name
const getInitials = (name) => {
	if (!name) return "?"
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.substring(0, 2)
}

// Function to generate a consistent color based on name
const getAvatarColor = (name) => {
	if (!name) return "#156f56" // Default color

	// Simple hash function to generate consistent colors
	let hash = 0
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash)
	}

	// Convert to hex color - using a more diverse color palette
	const colors = [
		"#156f56", // emerald
		"#1e40af", // blue
		"#b91c1c", // red
		"#7e22ce", // purple
		"#0e7490", // cyan
		"#c2410c", // orange
		"#4d7c0f", // lime
		"#86198f", // pink
		"#1e3a8a", // indigo
		"#a16207", // amber
		"#0f766e", // teal
		"#713f12", // brown
		"#365314", // green
		"#831843", // rose
		"#4338ca", // violet
	]

	const index = Math.abs(hash) % colors.length
	return colors[index]
}

const CommentSection = () => {
	const [params, setParams] = useState({
		limit: 20,
		page: 1,
		sortBy: "created_at", // Sort by newest first
		sortType: "desc",
	})
	const [newComment, setNewComment] = useState({ name: "", content: "" })
	const { data, isLoading, refetch } = useCommentsListQuery(params)

	const handleRefresh = () => {
		refetch()
	}

	const postCommentMutation = useMutation({
		mutationFn: postComment,
	})

	// Submit function with API integration
	const handleSubmit = (e) => {
		e.preventDefault()
		const body = { name: newComment.name, content: newComment.content }

		try {
			postCommentMutation.mutate(body, {
				onSuccess: async () => {
					refetch()
					// Reset form
					setNewComment({ name: "", content: "" })
				},
				onError: (error) => {
					console.log(error)
				},
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div
			className={`${playfairFont.className} w-full bg-white rounded-lg shadow-lg mb-10`}
		>
			{/* Header */}
			<div className="bg-text-primary text-white p-4 rounded-t-lg">
				<h2
					className={`${gwendolynFont.className} text-4xl font-bold text-center`}
				>
					Ucapan & Doa
				</h2>
			</div>

			{/* Comments list */}
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-text-primary font-medium">Daftar Ucapan</h3>
					<button
						onClick={handleRefresh}
						className="text-sm bg-emerald-100 hover:bg-emerald-200 text-text-primary px-3 py-1 rounded-full transition-colors duration-200 flex items-center"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<span className="inline-block animate-spin h-4 w-4 border-2 border-emerald-700 border-t-transparent rounded-full mr-2"></span>
								Memuat...
							</>
						) : (
							<span>Segarkan</span>
						)}
					</button>
				</div>

				<div className="space-y-4 max-h-96 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
					{isLoading ? (
						<div className="text-center py-8">
							<div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-700"></div>
							<p className="mt-2 text-emerald-700">Memuat ucapan...</p>
						</div>
					) : !data?.data || data.data.length === 0 ? (
						<div className="text-center py-8 bg-emerald-50 rounded-lg">
							<p className="text-gray-500 mb-2">Belum ada ucapan.</p>
							<p className="text-text-primary font-medium">
								Jadilah yang pertama!
							</p>
						</div>
					) : (
						data.data.map((comment) => {
							const avatarColor = getAvatarColor(comment.name)
							return (
								<div
									key={comment.id}
									className="flex items-start gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200"
								>
									<div
										className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
										style={{ backgroundColor: avatarColor }}
									>
										<span style={{ color: "white" }}>
											{getInitials(comment.name)}
										</span>
									</div>
									<div className="flex-1 text-text-primary">
										<div className="flex justify-between text-sm items-center">
											<p className="font-semibold">
												<span style={{ color: avatarColor }}>
													{comment.name}
												</span>
											</p>
											<p className="text-xs text-gray-500">
												{comment.created_at
													? new Date(comment.created_at).toLocaleDateString()
													: ""}
											</p>
										</div>
										<p className="mt-1 text-sm whitespace-pre-wrap">
											{comment.content}
										</p>
									</div>
								</div>
							)
						})
					)}
				</div>
			</div>

			{/* Comment form */}
			<div className="p-4 border-t border-emerald-100 text-text-primary">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label
							htmlFor="name"
							className="block font-medium text-text-primary mb-1"
						>
							Nama
						</label>
						<input
							type="text"
							id="name"
							className="w-full text-sm px-3 py-2 border bg-emerald-100 border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
							placeholder="Masukkan nama kamu"
							value={newComment.name}
							onChange={(e) =>
								setNewComment({ ...newComment, name: e.target.value })
							}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="content"
							className="block font-medium text-text-primary mb-1"
						>
							Ucapan & Doa
						</label>
						<textarea
							id="content"
							rows="3"
							className="w-full text-sm px-3 py-2 border bg-emerald-100 border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
							placeholder="Doakan kebaikan untuk kita yaaa..."
							value={newComment.content}
							onChange={(e) =>
								setNewComment({ ...newComment, content: e.target.value })
							}
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-text-primary hover:bg-emerald-800 text-white py-2 rounded-md transition-colors duration-200"
						disabled={postCommentMutation.isPending}
					>
						{postCommentMutation.isPending ? (
							<span className="flex items-center justify-center">
								<span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
								Mengirim...
							</span>
						) : (
							"Kirim Ucapan"
						)}
					</button>
				</form>
			</div>
		</div>
	)
}

export default CommentSection
