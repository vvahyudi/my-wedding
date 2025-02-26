import { getAllComments, getGuestBySlug } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useGuestBySlugQuery = (slug) => {
	return useQuery({
		queryKey: ["guests-name"],
		queryFn: async () => await getGuestBySlug(slug),
	})
}
export const useCommentsListQuery = (params) => {
	return useQuery({
		queryKey: ["comment-lists"],
		queryFn: async () => await getAllComments(params),
	})
}
