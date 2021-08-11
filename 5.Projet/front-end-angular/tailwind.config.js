module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.TAILWIND_MODE === 'build',
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Raleway', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
    container: {
      padding: '1.5rem',
    },
    extends: {
      color: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#2B4168', // or blue-900
        secondary: '#39B1A1', // or teal-500
      },
    },
  },
  variants: {},
  plugins: [
      require('@tailwindcss/forms'),
  ],
};
