module.exports = {
		purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
		darkMode: false, // or 'media' or 'class'
		theme: {
				fontFamily: {
						display: ['Raleway', 'sans-serif'],
						body: ['Poppins', 'sans-serif'],
						'allison': ['"Allison"', 'cursive']
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
						blueGray: { 500: '#64748B' },
						coolGray: { 500: '#6B7280' },
						trueGray: { 500: '#737373' },
						warmGray: { 500: '#78716C' },
						amber: { 500: '#F59E0B' },
						lime: { 500: '#84CC16' },
						emerald: { 500: '#10B981' },
						cyan: { 500: '#06B6D4' },
						sky: { 500: '#0EA5E9' },
						violet: { 500: '#7C3AED' },
						fuchsia: { 500: '#D946EF' },
						rose: { 500: '#F43F5E' },
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
