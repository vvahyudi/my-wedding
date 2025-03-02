"use client"

import React from "react"
import { playfairFont } from "@/styles/font"
import Link from "next/link"

const AdminPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="text-center mb-8">
				<h1
					className={`${playfairFont.className} text-4xl font-bold text-text-primary`}
				>
					Wedding Admin Dashboard
				</h1>
				<p className="text-gray-600 mt-2">
					Welcome to your wedding invitation management system
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
				<Link href="/admin/guests">
					<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
						<h2 className="text-xl font-bold text-text-primary">
							Guest Management
						</h2>
						<p className="text-gray-600 mt-2">
							Add, view, and manage your guest list
						</p>
					</div>
				</Link>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-bold text-text-primary">Analytics</h2>
					<p className="text-gray-600 mt-2">
						View invitation statistics (Coming Soon)
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-bold text-text-primary">Settings</h2>
					<p className="text-gray-600 mt-2">
						Customize your wedding site (Coming Soon)
					</p>
				</div>

				<Link href="/">
					<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
						<h2 className="text-xl font-bold text-text-primary">
							View Wedding Site
						</h2>
						<p className="text-gray-600 mt-2">
							Preview your wedding invitation website
						</p>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default AdminPage
