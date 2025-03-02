import { getAllComments, getGuestBySlug, getAllGuests } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useGuestsListQuery = (params) => {
	return useQuery({
		queryKey: ["guests-list", params],
		queryFn: async () => await getAllGuests(params),
		refetchOnWindowFocus: false,
	})
}

export const useGuestBySlugQuery = (slug) => {
	return useQuery({
		queryKey: ["guests-name", slug], // Tambahkan slug ke queryKey untuk cache yang tepat
		queryFn: async () => await getGuestBySlug(slug),
		retry: 1, // Hanya coba ulang sekali jika gagal
		refetchOnWindowFocus: false,
		onError: (error) => {
			console.error("Error fetching guest data:", error)
		},
	})
}

export const useCommentsListQuery = (params) => {
	return useQuery({
		queryKey: ["comment-lists", params],
		queryFn: async () => await getAllComments(params),
		refetchOnWindowFocus: false,
	})
}
