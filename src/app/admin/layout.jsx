"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Link from "next/link"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 30 * 1000,
		},
	},
})

export default function AdminLayout({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen bg-gray-50">
				<header className="bg-text-primary text-white shadow-md">
					<div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
						<h1 className="text-2xl font-bold">Wedding Admin</h1>
						<nav className="flex space-x-4">
							<Link
								href="/admin/guests"
								className="px-3 py-2 rounded-md hover:bg-emerald-800 transition-colors"
							>
								Guests
							</Link>
							<Link
								href="/"
								className="px-3 py-2 rounded-md hover:bg-emerald-800 transition-colors"
							>
								View Site
							</Link>
						</nav>
					</div>
				</header>
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
		</QueryClientProvider>
	)
}
