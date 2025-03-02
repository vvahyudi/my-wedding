"use client"

import React, { useState } from "react"
import { playfairFont } from "@/styles/font"
import { useGuestsList } from "@/hooks/useGuests"
import WhatsAppButton from "./WhatsAppButton"
import { Search } from "lucide-react"

const GuestList = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [searchTerm, setSearchTerm] = useState("")
	const [sortBy, setSortBy] = useState("name")
	const [sortType, setSortType] = useState("asc")
	const [isSearchVisible, setIsSearchVisible] = useState(false)

	const { data, isLoading, isError, error, refetch } = useGuestsList({
		page,
		limit,
		search: searchTerm,
		sortBy,
		sortType,
	})

	const handleSearch = (e) => {
		e.preventDefault()
		refetch()
	}

	const handleNextPage = () => {
		if (data && data.pagination && page < data.pagination.totalPage) {
			setPage((prev) => prev + 1)
		}
	}

	const handlePrevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1)
		}
	}

	// Function to toggle sort
	const handleSort = (field) => {
		if (sortBy === field) {
			setSortType(sortType === "asc" ? "desc" : "asc")
		} else {
			setSortBy(field)
			setSortType("asc")
		}
	}

	return (
		<div
			className={`${playfairFont.className} w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-4 sm:mt-6`}
		>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
				<h2 className="text-xl font-bold text-text-primary">Guest List</h2>

				{/* Mobile search toggle */}
				<div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
					<button
						onClick={() => setIsSearchVisible(!isSearchVisible)}
						className="sm:hidden bg-text-primary text-white px-4 py-2 rounded flex items-center justify-center"
					>
						<Search size={18} className="mr-2" />
						{isSearchVisible ? "Hide Search" : "Search"}
					</button>

					<form
						onSubmit={handleSearch}
						className={`${
							isSearchVisible ? "flex" : "hidden"
						} sm:flex w-full flex-row`}
					>
						<input
							type="text"
							placeholder="Search by name..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 bg-emerald-100 text-text-primary rounded-l-md focus:outline-none focus:ring-2 focus:ring-text-primary"
						/>
						<button
							type="submit"
							className="bg-text-primary text-white px-3 sm:px-4 py-2 rounded-r-md hover:bg-emerald-800 transition-colors duration-200 whitespace-nowrap"
						>
							Search
						</button>
					</form>
				</div>
			</div>

			{isLoading ? (
				<div className="text-center py-8 sm:py-12">
					<div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-emerald-700"></div>
					<p className="mt-2 text-gray-500">Loading guests...</p>
				</div>
			) : isError ? (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error.message || "An error occurred while fetching guest data"}
				</div>
			) : (
				<>
					{/* Mobile card view */}
					<div className="block sm:hidden">
						{data && data.data && data.data.length > 0 ? (
							data.data.map((guest) => (
								<div
									key={guest.id}
									className="bg-gray-50 rounded-lg p-3 mb-4 shadow-sm"
								>
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-medium text-text-primary">
											{guest.name}
										</h3>
									</div>

									<div className="grid grid-cols-2 gap-1 text-sm mb-3">
										<div className="text-gray-600">Slug:</div>
										<div className="text-text-primary">{guest.slug}</div>

										{guest.address && (
											<>
												<div className="text-gray-600">Address:</div>
												<div className="text-text-primary">{guest.address}</div>
											</>
										)}

										{guest.phone && (
											<>
												<div className="text-gray-600">Phone:</div>
												<div className="text-text-primary">{guest.phone}</div>
											</>
										)}
									</div>

									<div className="flex flex-wrap gap-2 mt-2">
										<a
											href={`/admin/guests/${guest.slug}`}
											className="bg-text-primary text-white px-2 py-1 rounded text-xs hover:bg-emerald-800 transition-colors"
										>
											View
										</a>
										<a
											href={`/${guest.slug}`}
											className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
											target="_blank"
										>
											Invitation
										</a>
										<WhatsAppButton
											phone={guest.phone}
											guestName={guest.name}
											invitationUrl={`${window.location.origin}/${guest.slug}`}
											variant="button"
										>
											WhatsApp
										</WhatsAppButton>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-6 text-gray-500">
								No guests found.
							</div>
						)}
					</div>

					{/* Desktop table view */}
					<div className="hidden sm:block overflow-x-auto">
						<table className="min-w-full bg-white">
							<thead className="bg-gray-100 text-text-primary">
								<tr>
									<th
										className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
										onClick={() => handleSort("name")}
									>
										Name {sortBy === "name" && (sortType === "asc" ? "↑" : "↓")}
									</th>
									<th
										className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
										onClick={() => handleSort("slug")}
									>
										Slug {sortBy === "slug" && (sortType === "asc" ? "↑" : "↓")}
									</th>
									<th className="py-2 px-4 border-b text-left">Address</th>
									<th className="py-2 px-4 border-b text-left">Phone</th>
									<th className="py-2 px-4 border-b text-left">Actions</th>
								</tr>
							</thead>
							<tbody>
								{data && data.data && data.data.length > 0 ? (
									data.data.map((guest) => (
										<tr key={guest.id} className="hover:bg-gray-50">
											<td className="py-2 px-4 border-b text-text-primary text-sm">
												{guest.name}
											</td>
											<td className="py-2 px-4 border-b text-text-primary text-sm">
												{guest.slug}
											</td>
											<td className="py-2 px-4 border-b text-text-primary text-sm">
												{guest.address || "-"}
											</td>
											<td className="py-2 px-4 border-b text-text-primary text-sm">
												{guest.phone || "-"}
											</td>
											<td className="py-2 px-4 border-b">
												<div className="flex space-x-2">
													<a
														href={`/admin/guests/${guest.slug}`}
														className="bg-text-primary text-white px-2 py-1 rounded text-xs hover:bg-emerald-800 transition-colors"
													>
														View
													</a>
													<a
														href={`/${guest.slug}`}
														className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
														target="_blank"
													>
														Invitation
													</a>
													<WhatsAppButton
														phone={guest.phone}
														guestName={guest.name}
														invitationUrl={`${window.location.origin}/${guest.slug}`}
														variant="button"
													>
														WhatsApp
													</WhatsAppButton>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="5" className="py-4 text-center text-gray-500">
											No guests found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{data && data.pagination && (
						<div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
							<div className="text-xs sm:text-sm text-gray-600">
								Showing {data.data.length} of {data.pagination.totalData} guests
							</div>
							<div className="flex space-x-2">
								<button
									onClick={handlePrevPage}
									disabled={page === 1}
									className="px-2 sm:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-sm"
								>
									Previous
								</button>
								<span className="px-2 sm:px-3 py-1 bg-gray-100 rounded text-sm">
									{page}/{data.pagination.totalPage || 1}
								</span>
								<button
									onClick={handleNextPage}
									disabled={page >= data.pagination.totalPage}
									className="px-2 sm:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-sm"
								>
									Next
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default GuestList
