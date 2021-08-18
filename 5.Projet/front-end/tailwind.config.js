module.exports = {
		purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
		darkMode: false, // or 'media' or 'class'
		theme: {
				fontFamily: {
						display: ['Raleway', 'sans-serif'],
						body: ['Poppins', 'sans-serif'],
				},
				container: {
						padding: '1.5rem',
						center: true,
				},
				extends: {
						color: {
								inherit: 'inherit',
								transparent: 'transparent',
								current: 'currentColor',
						},
				},
				colors: {
						primary: '#2B4168', // or blue-900
						secondary: '#39B1A1', // or teal-500
				}
		},
		variants: {
				extend: {
						opacity: ['disabled'],
						backgroundColor: ['disabled'],
						cursor: ['disabled']
				},
		},
		plugins: [
				// require('@tailwindcss/forms'),
		],
}
