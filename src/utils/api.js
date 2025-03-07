// src/utils/api.js
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ""

export const getAllGuests = async (params) => {
	const {
		limit = 10,
		page = 1,
		sortBy = "created_at",
		sortType = "desc",
	} = params || {}
	try {
		const response = await axios.get(
			`${API_URL}/guest?search=&sort=${sortBy}.${sortType}&limit=${limit}&page=${page}`,
			{},
		)
		return response.data
	} catch (error) {
		console.error("Error fetching guests:", error)
		throw error
	}
}
export const getGuestBySlug = async (slug) => {
	try {
		if (!slug) {
			throw new Error("Slug is required")
		}

		const response = await axios.get(`${API_URL}/guest/${slug}`, {})
		return response.data
	} catch (error) {
		console.error("Error fetching guest data:", error)
		throw error // Re-throw for proper error handling
	}
}

export const getAllComments = async (params) => {
	const {
		limit = 10,
		page = 1,
		sortBy = "created_at",
		sortType = "desc",
	} = params || {}
	try {
		const response = await axios.get(
			`${API_URL}/comment?search=&sort=${sortBy}.${sortType}&limit=${limit}&page=${page}`,
			{},
		)
		return response.data
	} catch (error) {
		console.error("Error fetching comments:", error)
		throw error
	}
}

export const postComment = async (body) => {
	try {
		if (!body.name || !body.content) {
			throw new Error("Name and content are required")
		}

		const response = await axios.post(`${API_URL}/comment`, body)
		return response.data
	} catch (error) {
		console.error("Error posting comment:", error)
		throw error
	}
}

export const login = async (body) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, body)
		return response.data
	} catch (error) {
		if (!response.ok) {
			throw new Error(response.statusText)
		}
	}
}
export const logout = async (body) => {
	try {
		const response = await axios.post(`${API_URL}/auth/logout`, body)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
