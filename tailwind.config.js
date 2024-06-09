
module.exports = { 
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },

      colors: {
        'primary': 'var(--color-primary)',
        'success': 'var(--color-success)',
        'danger': 'var(--color-danger)',
        'secondary': 'var(--color-secondary)',
        'warning': 'var(--color-warning)',
        'info': 'var(--color-info)',
        'light': 'var(--color-light)',
        'dark': 'var(--color-dark)'
      }
    },
    fontSize: {
      'xs':   ['10px', '12px'],
      'sm':   ['12px', '14px'],
      'base': ['14px', '16px'],
      'lg':   ['16px', '18px'],
      'xl':   ['18px', '20px'],
      '2xl':  ['20px', '22px'],
      '3xl':  ['26px', '28px'],
      '4xl':  ['36px', '38px'],
      '5xl':  ['48px', '50px'],
      '6xl':  ['60px', '62px'],
      '7xl':  ['72px', '74px'],
      '8xl':  ['96px', '100px'],
      '9xl':  ['128px', '134px'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
}
