"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { playfairFont, gwendolynFont } from "@/styles/font"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function LoginPage() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")
		setLoading(true)

		try {
			// Here you would typically make an API call to your backend
			// For example:
			// const response = await fetch('/api/auth/login', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ username, password }),
			// })

			// if (!response.ok) {
			//   throw new Error('Login failed')
			// }

			// const data = await response.json()
			// Handle successful login - e.g., store token and redirect

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Redirect to main page after successful login
			window.location.href = "/admin/guests"
		} catch (error) {
			setError("Invalid username or password. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[url('/latar.png')] bg-cover bg-center bg-no-repeat">
			<div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
				{/* Logo/Header Section */}
				<div className="p-6 bg-text-primary text-white text-center">
					<h2 className={`${gwendolynFont.className} text-4xl font-bold`}>
						Ati & Yudi
					</h2>
					<p className={`${playfairFont.className} text-sm mt-1`}>
						Wedding Invitation Portal
					</p>
				</div>

				{/* Login Form */}
				<div className="p-6 space-y-4">
					<h3
						className={`${playfairFont.className} text-xl font-semibold text-text-primary text-center`}
					>
						Welcome Back
					</h3>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className={`${playfairFont.className} block text-sm font-medium text-gray-700 mb-1`}
							>
								Username
							</label>
							<input
								id="username"
								type="username"
								required
								className="w-full px-3 py-2 border border-emerald-300 bg-emerald-100 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
								placeholder="Enter your username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className={`${playfairFont.className} block text-sm font-medium text-gray-700 mb-1`}
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									className="w-full px-3 py-2 border border-emerald-300 bg-emerald-100 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-text-primary"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							<div className="mt-1 text-right">
								<Link
									href="/forgot-password"
									className="text-sm text-text-primary hover:underline"
								>
									Forgot password?
								</Link>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-text-primary hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text-primary transition-colors duration-200"
						>
							{loading ? (
								<span className="flex items-center">
									<span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
									Signing in...
								</span>
							) : (
								<span className="flex items-center">
									<LogIn className="mr-2" size={18} />
									Sign In
								</span>
							)}
						</button>
					</form>

					<div className="text-center mt-4">
						<p className={`${playfairFont.className} text-sm text-gray-600`}>
							Don't have an account?{" "}
							<Link
								href="/register"
								className="text-text-primary hover:underline"
							>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
