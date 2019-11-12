/**
 * Site theme
 */

import { alpha, darken, lighten, readable } from './utils/color'

const colors = {
  transparent: 'transparent',
  white: '#fff',
  black: '#000',

  primary: '#339af0',
  secondary: '#22b8cf',
  accent: '#ff6b6b',
  highlight: '#fcc419',
  muted: '#868e96',
  light: '#f1f3f5',
  gray: '#e9ecef',
  dark: '#495057',

  text: '#495057',
  background: '#f4f8fb',
  border: '#e2e8f0', // '#e9ecef',

  // Color Modes
  modes: {
    dark: {
      primary: '#f03e3e', // '#4dabf7',
      secondary: '#3bc9db',
      accent: '#ff8787',
      highlight: '#ffd43b',
      muted: '#adb5bd',
      light: '#343a40',
      gray: '#292d32',
      dark: '#16181b',

      text: '#fff',
      background: '#212529', // '#0a0c0d',
      border: '#262b2f'
    }
  }
}

const fonts = {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ].join(),
  serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'].join(),
  mono: [
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace'
  ].join()
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

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
}

const breakpoints = ['640px', '768px', '1024px', '1280px']

const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
  xlarge: `@media screen and (min-width: ${breakpoints[3]})`
}

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
  logo: '1.5625rem',
  icon: '1.5rem',
  card: '18rem',
  avatar: '6rem'
}

const borders = {
  none: 'none',
  default: '1px solid transparent',
  double: '2px solid transparent'
}

const borderWidths = {
  0: 0,
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px',
  5: '5px'
}

const borderStyles = {
  default: 'solid'
}

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
  outline: '0 0 0 0.125rem rgba(0, 0, 0, 0.1)',
  underline: 'inset 0 -1px 0 currentColor',
  text: '0 0 0.25rem rgba(0, 0, 0, 0.4)',
  light: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
  medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
  severe: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
}

// TODO
const zIndices = {
  highest: 99,
  higher: 10,
  high: 1,
  low: -1,
  lower: -10,
  lowest: -99
}

// TODO: not support
const transitions = {
  base: 'all 0.2s ease-in-out',
  fade: 'opacity 0.15s linear'
}

const heading = {
  margin: 0,
  marginBottom: 3,
  color: null,
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading'
}

const styles = {
  '*': {
    boxSizing: 'border-box',
    borderWidth: 0,
    borderStyle: 'default',
    borderColor: 'border'
  },
  '::selection': {
    backgroundColor: alpha('primary', 0.6),
    color: readable('primary')
  },
  body: {
    fontSize: 'body',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    transition: 'background 0.3s, color 0.3s',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitTextSizeAdjust: '100%'
  },
  hr: {
    height: 1,
    marginY: 3,
    border: 0,
    backgroundColor: 'currentColor',
    opacity: 0.2
  },
  h1: {
    ...heading,
    fontSize: 7
  },
  h2: {
    ...heading,
    fontSize: 6
  },
  h3: {
    ...heading,
    fontSize: 5
  },
  h4: {
    ...heading,
    fontSize: 4
  },
  h5: {
    ...heading,
    fontSize: 3
  },
  h6: {
    ...heading,
    fontSize: 2
  },
  p: {
    margin: 0,
    marginBottom: 3,
    ':last-child': {
      marginBottom: 0
    }
  },
  ol: {},
  ul: {},
  blockquote: {
    margin: 0,
    marginBottom: 3,
    paddingX: 3,
    paddingY: 3,
    borderLeftWidth: '4',
    borderColor: lighten('primary', 0.1),
    backgroundColor: 'light',
    borderRadius: 'medium'
  },
  pre: {
    overflowX: 'auto',
    paddingX: 3,
    paddingY: 3,
    fontFamily: 'mono',
    code: {
      color: 'inherit'
    }
  },
  code: {
    fontFamily: 'mono',
    fontSize: '90%'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0
  },
  th: {
    textAlign: 'left',
    borderBottomStyle: 'solid'
  },
  td: {
    textAlign: 'left',
    borderBottomStyle: 'solid'
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    // transition: 'box-shadow 0.25s',
    ':hover': {
      color: darken('primary', 0.05),
      textDecoration: 'underline'
      // boxShadow: 'underline'
    },
    ':active': {
      color: darken('primary', 0.1)
    }
  }
}

const variants = {}

export default {
  useCustomProperties: true,
  useColorSchemeMediaQuery: true,
  initialColorMode: 'default',
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  breakpoints,
  mediaQueries,
  space,
  sizes,
  borders,
  borderWidths,
  borderStyles,
  radii,
  shadows,
  zIndices,
  transitions,
  styles,
  variants
}
