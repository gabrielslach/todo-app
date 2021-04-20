module.exports = {
  purge: {
    content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options:{
      safelist: [
        'h-5',
        'w-5',
        'h-8',
        'w-8',
        'bg-green-50',
        'bg-green-200',
        'bg-green-400',
        'bg-green-600',
        'bg-green-800',
        'bg-blue-50',
        'bg-blue-200',
        'bg-blue-400',
        'bg-blue-600',
        'bg-blue-800',
        'bg-red-50',
        'bg-red-200',
        'bg-red-400',
        'bg-red-600',
        'bg-red-800',
        'bg-yellow-50',
        'bg-yellow-200',
        'bg-yellow-400',
        'bg-yellow-600',
        'bg-yellow-800',
        'bg-indigo-50',
        'bg-indigo-200',
        'bg-indigo-400',
        'bg-indigo-600',
        'bg-indigo-800',
        'bg-purple-50',
        'bg-purple-200',
        'bg-purple-400',
        'bg-purple-600',
        'bg-purple-800',
        'bg-pink-50',
        'bg-pink-200',
        'bg-pink-400',
        'bg-pink-600',
        'bg-pink-800',
        'text-green-50',
        'text-green-700',
        'text-blue-50',
        'text-blue-700',
        'text-red-50',
        'text-red-700',
        'text-yellow-50',
        'text-yellow-700',
        'text-indigo-50',
        'text-indigo-700',
        'text-purple-50',
        'text-purple-700',
        'text-pink-50',
        'text-pink-700',
      ]
    }
    },
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
