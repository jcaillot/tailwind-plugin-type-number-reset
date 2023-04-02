const plugin = require('tailwindcss/plugin')

const typeNumberReset = plugin(function ({ addUtilities }) {
  addUtilities([
    {
      '.type-number-reset': {
        '-moz-appearance': 'textfield',
        '&::-webkit-inner-spin-button': {
          appearance: 'none',
        },
        '&::-webkit-outer-spin-button': {
          appearance: 'none',
        },
      },
    },
  ])
})

module.exports = typeNumberReset
