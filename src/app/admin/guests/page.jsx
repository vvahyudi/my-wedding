"use client"

import React from "react"
import GuestForm from "@/components/GuestForm"
import GuestList from "@/components/GuestList"
import { playfairFont } from "@/styles/font"

const GuestsAdminPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="text-center mb-8">
				<h1
					className={`${playfairFont.className} text-4xl font-bold text-text-primary`}
				>
					Guest Management
				</h1>
				<p className="text-gray-600 mt-2">
					Add new guests to your wedding invitation list
				</p>
			</div>

			<GuestForm />
			<GuestList />
		</div>
	)
}

export default GuestsAdminPage
