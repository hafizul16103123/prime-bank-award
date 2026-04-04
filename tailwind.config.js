module.exports = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#000",
				secondary: "#282A2D",
				tartiary: "#E0E0E0",
				default: "#fafafa",
				white: "#ffffff",
				gray: "#5F6368",
				green: "#002C00",
			},
			fontFamily: {
				sans: ["var(--font-poppins)", "sans-serif"],
			},
		},
	},
	plugins: [],
};
