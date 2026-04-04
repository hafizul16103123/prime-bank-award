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
				primary: "#111B21",
				secondary: "#282A2D",
				tartiary: "#f1f3f4",
				default: "#F9F9F9",
				white: "#ffffff",
				gray: "#5F6368",
				green: "#002C00",
				"light-green": "#E6F0E6",
				"light-pink": "#FCE5ED",
				"light-blue": "#E3F2FD",
				"light-yellow": "#FFF9C4",
			},
			fontFamily: {
				sans: ["var(--font-poppins)", "sans-serif"],
			},
		},
	},
	plugins: [],
};
