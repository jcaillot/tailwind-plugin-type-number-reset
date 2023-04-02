const postcss = require('postcss')
const path = require('path')
const tailwindcss = require('tailwindcss')
const cssMatcher = require('jest-matcher-css')
const typeNumberReset = require('./index.js')

const willRunTailwindCssUtilities = () => {
  let { currentTestDescription } = expect.getState()
  return postcss(
    tailwindcss({
      // disabling everything but our plugin;
      corePlugins: false,
      plugins: [typeNumberReset],
      // making it thru tailwind tree shaking:
      content: [{ raw: String.raw`<div class="type-number-reset"></div>` }],
    })
  )
    .process(['@tailwind base;', '@tailwind components;', '@tailwind utilities'].join('\n'), {
      from: `${path.resolve(__filename)}?test=${currentTestDescription}`,
    })
    .then((result) => result.css)
}

expect.extend({
  toMatchCss: cssMatcher,
})

describe('typeNumberReset', () => {
  const expectedOutput = `
    .type-number-reset {
        -moz-appearance: textfield;
    }
    .type-number-reset::-webkit-inner-spin-button {
        appearance: none;
    }
    .type-number-reset::-webkit-outer-spin-button {
        appearance: none;
    }
`

  it('generates the expected class', async () => {
    willRunTailwindCssUtilities().then((css) => {
      expect(css).toMatchCss(expectedOutput)
    })
  })
})
