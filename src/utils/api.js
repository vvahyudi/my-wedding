// src/utils/api.js
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const getGuestBySlug = async (slug) => {
	try {
		const response = await axios.get(`${API_URL}/guest/${slug}`, {})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export const getAllComments = async (params) => {
	const { limit, page, sortBy, sortType } = params
	try {
		const response = await axios.get(
			`${API_URL}/comment?search=&sort=${sortBy}.${sortType}&limit=${limit}&page=${page}`,
			{},
		)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
export const postComment = async (body) => {
	try {
		const response = await axios.post(`${API_URL}/comment`, body)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
