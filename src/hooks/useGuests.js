import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchGuests, addGuest, getGuestBySlug } from "@/utils/guestApi"

/**
 * Hook for fetching guests with filtering and pagination
 * @param {Object} options - Query parameters and options
 * @returns {Object} - React Query result object
 */
export const useGuestsList = ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "name",
	sortType = "asc",
	enabled = true,
}) => {
	return useQuery({
		queryKey: ["guests", page, limit, search, sortBy, sortType],
		queryFn: () => fetchGuests({ page, limit, search, sortBy, sortType }),
		enabled,
	})
}

/**
 * Hook for adding a new guest
 * @param {Object} options - Configuration options
 * @returns {Object} - React Query mutation result object
 */
export const useAddGuest = ({ onSuccess, onError } = {}) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addGuest,
		onSuccess: (data) => {
			// Invalidate and refetch guests queries
			queryClient.invalidateQueries({ queryKey: ["guests"] })

			// Call the onSuccess callback if provided
			if (onSuccess) {
				onSuccess(data)
			}
		},
		onError: (error) => {
			// Call the onError callback if provided
			if (onError) {
				onError(error)
			}
		},
	})
}

/**
 * Hook for fetching a single guest by slug
 * @param {string} slug - Guest slug
 * @param {Object} options - Query options
 * @returns {Object} - React Query result object
 */
export const useGuestBySlug = (slug, { enabled = true } = {}) => {
	return useQuery({
		queryKey: ["guest", slug],
		queryFn: () => getGuestBySlug(slug),
		enabled: !!slug && enabled,
	})
}
