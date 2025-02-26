"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function Providers({ children }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // jangan refetch saat window mendapat fokus
						retry: 1, // coba ulang 1 kali jika gagal
						staleTime: 30 * 1000, // data dianggap usang setelah 30 detik
						refetchInterval: false, // jangan refetch secara otomatis berdasarkan interval
						refetchIntervalInBackground: false, // jangan refetch di background
						// Pastikan query dijalankan secara default saat komponen dimuat
						enabled: true,
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* Tambahkan React Query Devtools jika dalam mode development */}
			{process.env.NODE_ENV === "development" && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryClientProvider>
	)
}
