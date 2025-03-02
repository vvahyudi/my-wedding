// Guest API utility functions

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ""

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
	const response = await fetch(
		`${API_URL}/guest?search=${search}&sort=${sortBy}.${sortType}&limit=${limit}&page=${page}`,
		{ method: "GET" },
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to fetch guests")
	}

	return await response.json()
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
	const response = await fetch(`${API_URL}/guest`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(guestData),
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to add guest")
	}

	return await response.json()
}

/**
 * Get a guest by slug
 * @param {string} slug - Guest slug
 * @returns {Promise<Object>} - Guest data
 */
export const getGuestBySlug = async (slug) => {
	const response = await fetch(`${API_URL}/guest/${slug}`, {
		method: "GET",
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || `Guest with slug "${slug}" not found`)
	}

	return await response.json()
}
