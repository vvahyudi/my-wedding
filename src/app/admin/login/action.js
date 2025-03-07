"use server"

import { cookies } from "next/headers"

export async function setToken(token) {
	const cookieStore = await cookies() // Await sebelum menggunakan cookies()
	cookieStore.set("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: "/",
	})
	return { success: true }
}

export async function getToken() {
	const cookieStore = await cookies() // Await sebelum menggunakan cookies()
	return cookieStore.get("token")?.value ?? null
}

export async function updateToken(token) {
	const cookieStore = await cookies() // Await sebelum menggunakan cookies()
	cookieStore.set("token", token)
}

export async function deleteToken() {
	const cookieStore = await cookies() // Await sebelum menggunakan cookies()
	cookieStore.delete("token")
	return { success: true }
}
