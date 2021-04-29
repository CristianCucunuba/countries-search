const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./src/components/*", "./src/pages/**/*", "./src/icons/*"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Nunito", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "dark-bg": "#2B3945",
        "dark-blue": "#202C37",
        "lm-text": "#111517",
        "lm-input": "#858585"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
