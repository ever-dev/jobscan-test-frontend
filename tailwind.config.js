// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        layout: '25rem 1fr',
        job: '2rem 3fr 1fr 1fr',
        skill: '1frem 1fr 2rem 2rem',
      },
      colors: {
        primary: 'rgb(13, 148, 136)',
        danger: '#ed6761',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
