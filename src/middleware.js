import { NextRequest, NextResponse } from "next/server"

export function middleware(request) {
	const token = request.cookies.get("token")
	const path = request.nextUrl.pathname
	if (!token && path !== "/admin/login")
		return NextResponse.redirect(new URL("/admin/login", request.url))

	if (token && path === "/admin/login")
		return NextResponse.redirect(new URL("/admin/guests", request.url))

	return NextResponse.next()
}

export const config = {
	matcher: ["/admin/:path*"],
}
