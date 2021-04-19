module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        appBarBlue: '#1D84EF',
        btnBlue: '#1871CD',
        btnHovBlue: '#075AB0',
        groupGray: '#E6EEF4',
        statusGray: '#858DA8'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
