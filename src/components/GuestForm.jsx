"use client"

import React, { useState } from "react"
import { playfairFont } from "@/styles/font"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addGuest } from "@/utils/guestApi"

const GuestForm = () => {
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
	})
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [error, setError] = useState(null)

	const addGuestMutation = useMutation({
		mutationFn: addGuest,
		onSuccess: () => {
			setIsSubmitted(true)
			setError(null)
			setFormData({
				name: "",
				address: "",
				phone: "",
			})

			// Invalidate guest list query to refresh the data
			queryClient.invalidateQueries({ queryKey: ["guests"] })

			// Reset the submitted state after 3 seconds
			setTimeout(() => {
				setIsSubmitted(false)
			}, 3000)
		},
		onError: (err) => {
			setError(err.message || "Failed to add guest")
		},
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		addGuestMutation.mutate(formData)
	}

	return (
		<div
			className={`${playfairFont.className} max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10`}
		>
			<h1 className="text-2xl font-bold text-text-primary text-center mb-6">
				Add New Guest
			</h1>

			{isSubmitted && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
					Guest successfully added!
				</div>
			)}

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 bg-emerald-100 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Address
					</label>
					<textarea
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						rows="3"
						className="w-full px-3 py-2 bg-emerald-100 text-text-primary border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
					/>
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Phone Number
					</label>
					<input
						type="text"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full px-3 py-2 border bg-emerald-100 text-text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
					/>
				</div>

				<div className="pt-2">
					<button
						type="submit"
						disabled={addGuestMutation.isPending}
						className="w-full bg-text-primary hover:bg-emerald-800 text-white py-2 rounded-md transition-colors duration-200 disabled:bg-gray-400"
					>
						{addGuestMutation.isPending ? (
							<span className="flex items-center justify-center">
								<span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
								Submitting...
							</span>
						) : (
							"Add Guest"
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default GuestForm
