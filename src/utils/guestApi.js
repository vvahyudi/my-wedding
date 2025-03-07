// Guest API utility functions with Axios
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ""

// Create axios instance with default configuration
const api = axios.create({
	baseURL: API_URL,
})

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		const token = localStorage.getItem("token") // Use your actual token key

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

/**
 * Fetch guests with pagination and filtering
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search term
 * @param {string} params.sortBy - Field to sort by
 * @param {string} params.sortType - Sort direction (asc/desc)
 * @returns {Promise<Object>} - Guest data with pagination
 */
export const fetchGuests = async ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "name",
	sortType = "asc",
}) => {
	try {
		const response = await api.get("/guest", {
			params: {
				search,
				sort: `${sortBy}.${sortType}`,
				limit,
				page,
			},
		})
		return response.data
	} catch (error) {
		throw new Error(error.response?.data?.message || "Failed to fetch guests")
	}
}

/**
 * Add a new guest
 * @param {Object} guestData - Guest data
 * @param {string} guestData.name - Guest name (required)
 * @param {string} guestData.address - Guest address
 * @param {string} guestData.phone - Guest phone number
 * @returns {Promise<Object>} - Added guest data
 */
export const addGuest = async (guestData) => {
	try {
		const response = await api.post("/guest", guestData)
		return response.data
	} catch (error) {
		throw new Error(error.response?.data?.message || "Failed to add guest")
	}
}

/**
 * Get a guest by slug
 * @param {string} slug - Guest slug
 * @returns {Promise<Object>} - Guest data
 */
export const getGuestBySlug = async (slug) => {
	try {
		const response = await api.get(`/guest/${slug}`)
		return response.data
	} catch (error) {
		throw new Error(
			error.response?.data?.message || `Guest with slug "${slug}" not found`,
		)
	}
}

/**
 * Delete a guest by slug
 * @param {string} slug - Guest slug
 * @returns {Promise<Object>} - Deleted guest data
 */
export const deleteGuest = async (slug) => {
	try {
		const response = await api.delete(`/guest/${slug}`)
		return response.data
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				`Failed to delete guest with slug "${slug}"`,
		)
	}
}
