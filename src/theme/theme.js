/**
 * Site theme
 */

// TODO: Redesign colors
// transparent, white, black
// primary, secondary, accent,
// highlight, muted
// light, dark
// text, background, border
const colors = {
  primary: '#15aabf',
  muted: '#717a82',
  light: '#f1f3f5',
  dark: '#495057',
  text: '#343a40',
  background: '#f8f9fa',
  border: '#dee2e6',
  modes: {
    dark: {
      primary: '#f08c00',
      muted: '#92a3ab',
      light: '#191b1f',
      dark: '#16181b',
      text: 'rgba(255, 255, 255, 0.75)',
      background: '#212529',
      border: '#2b2f36'
    }
  }
}

// prettier-ignore
const fonts = {
  sans: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: '"Fira Code", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
}
fonts.body = fonts.sans
fonts.heading = null

const fontSizes = [
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.125rem',
  '1.25rem',
  '1.5rem',
  '1.875rem',
  '2.25rem',
  '3rem',
  '4rem',
  '5rem'
]
fontSizes.xs = fontSizes[0]
fontSizes.sm = fontSizes[1]
fontSizes.md = fontSizes[2]
fontSizes.lg = fontSizes[3]
fontSizes.xl = fontSizes[4]
fontSizes.body = fontSizes[2]

const fontWeights = {
  light: 300,
  normal: 400,
  bold: 500,
  bolder: 600
}
fontWeights.body = fontWeights.normal
fontWeights.heading = fontWeights.bold

const lineHeights = {
  solid: 1,
  dense: 1.125,
  normal: 1.5,
  loose: 1.75,
  double: 2
}
lineHeights.body = lineHeights.normal
lineHeights.heading = 1.2

const breakpoints = ['640px', '768px', '1024px', '1280px']

const space = [
  0,
  '0.25rem',
  '0.5rem',
  '1rem',
  '1.5rem',
  '2rem',
  '2.5rem',
  '3rem',
  '5rem',
  '7rem'
]

const sizes = {
  container: '75rem',
  inner: '50rem',
  nav: '3rem'
}

const borders = [
  0,
  '1px solid transparent',
  '2px solid transparent',
  '4px solid transparent',
  '8px solid transparent',
  '16px solid transparent',
  '24px solid transparent'
]

const radii = {
  none: 0,
  small: '0.1875rem',
  medium: '0.25rem',
  large: '0.5rem',
  pill: '20rem',
  circle: '50%'
}

const shadows = {
  outline: '0 0 0 0.2rem rgba(0, 123, 255, 0.2)',
  underline: 'inset 0 -1px 0 currentColor',
  text: '0 0 0.25rem rgba(0, 0, 0, 0.4)',
  light: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)',
  medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)',
  severe: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
}

export default {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  breakpoints,
  space,
  sizes,
  borders,
  radii,
  shadows
}
