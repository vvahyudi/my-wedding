import "tailwindcss"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"text-primary": "#156f56",
			},
			backgroundImage: {
				"bg-front": "url('/bg-front.jpg')",
				"bg-front-1": "url('/bg-front-1.jpg')",
			},
		},
	},
	plugins: [require("daisyui"), require("tailwindcss-motion")],
}
