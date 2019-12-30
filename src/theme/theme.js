/**
 * Site theme
 *
 * TODO: Redesign colors
 */

const colors = {
  transparent: 'transparent',
  white: '#fff',
  black: '#000',

  primary: '#15aabf', // '#339af0',
  // secondary: '#22b8cf',
  // accent: '#ff6b6b',
  // highlight: '#fcc419',
  muted: '#717a82', // '#868e96',
  light: '#f1f3f5',
  // gray: '#738a94', // '#e9ecef',
  dark: '#495057',

  text: '#343a40', // '#495057',
  background: '#f8f9fa', // '#f4f8fb',
  border: '#dee2e6', // '#e9ecef',

  // Color Modes
  modes: {
    dark: {
      primary: '#f08c00', // '#f03e3e', // '#4dabf7',
      // secondary: '#3bc9db',
      // accent: '#ff8787',
      // highlight: '#ffd43b',
      muted: '#92a3ab', // '#adb5bd',
      light: '#191b1f', // '#343a40',
      // gray: '#92a3ab', // '#292d32',
      dark: '#16181b',

      text: 'rgba(255, 255, 255, 0.75)',
      background: '#212529', // '#0a0c0d',
      border: '#2b2f36' // '#262b2f'
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
  loose: 1.75
}
lineHeights.body = lineHeights.normal
lineHeights.heading = 1.2

// const letterSpacings = {
//   tighter: '-0.05em',
//   tight: '-0.025em',
//   normal: '0',
//   wide: '0.025em',
//   wider: '0.05em',
//   widest: '0.1em'
// }

const breakpoints = ['640px', '768px', '1024px', '1280px']

// const mediaQueries = {
//   small: `@media screen and (min-width: ${breakpoints[0]})`,
//   medium: `@media screen and (min-width: ${breakpoints[1]})`,
//   large: `@media screen and (min-width: ${breakpoints[2]})`,
//   xlarge: `@media screen and (min-width: ${breakpoints[3]})`
// }

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
  nav: '3rem',
  logo: '1.5rem'
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

const borderWidths = [0, '1px', '2px', '4px', '8px', '16px', '24px']

// const borderStyles = {
//   default: 'solid'
// }

const radii = {
  none: 0,
  small: '0.1875rem',
  medium: '0.25rem',
  large: '0.5rem',
  pill: '20rem',
  circle: '50%',
  default: '0.25rem'
}

const shadows = {
  outline: '0 0 0 0.2rem rgba(0, 123, 255, 0.2)',
  underline: 'inset 0 -1px 0 currentColor',
  text: '0 0 0.25rem rgba(0, 0, 0, 0.4)',
  light: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
  medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
  severe: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
}

const zIndices = {
  auto: 'auto',
  zero: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  backdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70
}

// // TODO: not support
// const transitions = {
//   base: 'all 0.2s ease-in-out',
//   fade: 'opacity 0.15s linear'
// }

// const styles = {}

// const variants = {}

export default {
  // useCustomProperties: true,
  // useColorSchemeMediaQuery: true,
  // initialColorMode: 'default',
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  // letterSpacings,
  breakpoints,
  // mediaQueries,
  space,
  sizes,
  borders,
  borderWidths,
  // borderStyles,
  radii,
  shadows,
  zIndices
  // transitions,
  // styles,
  // variants
}
