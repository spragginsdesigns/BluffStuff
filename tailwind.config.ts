import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#FF6B35",
					dark: "#E85A2A"
				},
				secondary: {
					DEFAULT: "#2EC4B6",
					dark: "#25A99D"
				},
				background: "#1A2634"
			}
		}
	},
	darkMode: "class",
	plugins: [nextui()]
};

export default config;
