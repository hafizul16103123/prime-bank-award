/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/app/api/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
	],
	theme: {
		extend: {
			screens: {
				xs: "360px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1440px",
				"3xl": "1536px",
				"4xl": "1920px",
			},
			colors: {
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				sidebar: {
					DEFAULT: "var(--sidebar)",
					foreground: "var(--sidebar-foreground)",
					primary: "var(--sidebar-primary)",
					"primary-foreground": "var(--sidebar-primary-foreground)",
					accent: "var(--sidebar-accent)",
					"accent-foreground": "var(--sidebar-accent-foreground)",
					border: "var(--sidebar-border)",
					ring: "var(--sidebar-ring)",
				},
				chart: {
					1: "var(--chart-1)",
					2: "var(--chart-2)",
					3: "var(--chart-3)",
					4: "var(--chart-4)",
					5: "var(--chart-5)",
				},
				subtle: "var(--subtle)",
				frost: "var(--frost)",
				"brand-blue": "var(--brand-blue)",
				pale: "var(--pale)",
				/* legacy palette (non–CSS-variable tokens) */
				default: "#fafafa",
				tartiary: "#E0E0E0",
				white: "#ffffff",
				/** Primary dark text / headings on light surfaces */
				ink: "var(--ink)",
				/** Secondary / supporting text on light surfaces */
				"muted-ink": "var(--muted-ink)",
				gray: "#5F6368",
				green: "#002C00",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
