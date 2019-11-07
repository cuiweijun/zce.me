/**
 * Site theme
 * ref: https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
 */

const colors = {
  transparent: 'transparent',
  white: '#fff',
  black: '#000',

  primary: '#339af0',
  secondary: '#22b8cf',
  accent: '#ff6b6b',
  highlight: '#fcc419',
  muted: '#606a73',
  light: '#e9ecef',
  gray: '#868e96',
  dark: '#343a40',

  text: '#495057',
  background: '#f4f8fb',

  // Color Modes
  modes: {
    dark: {
      primary: '#4dabf7',
      secondary: '#3bc9db',
      accent: '#ff8787',
      highlight: '#ffd43b',
      muted: '#495057',
      light: '#e9ecef',
      gray: '#dee2e6',
      dark: '#212529',

      text: '#fff',
      background: '#0a0c0d'
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
  ],
  serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
  mono: [
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace'
  ]
}
fonts.body = fonts.sans

const fontSizes = {
  0: '0.75rem',
  1: '0.875rem',
  2: '1rem',
  3: '1.125rem',
  4: '1.25rem',
  5: '1.5rem',
  6: '1.875rem',
  7: '2.25rem',
  8: '3rem',
  9: '4rem',
  tiny: '0.75rem',
  small: '0.875rem',
  base: '1rem',
  large: '1.25rem',
  xlarge: '1.5rem',
  huge: '2.25rem'
}
fontSizes.body = fontSizes.base

const fontWeights = {
  light: 300,
  normal: 400,
  bold: 600
}
fontWeights.body = fontWeights.normal

const lineHeights = {
  solid: 1,
  dense: 1.125,
  normal: 1.5,
  loose: 1.75
}
lineHeights.body = lineHeights.normal

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

const space = {
  0: 0,
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '2rem',
  6: '2.5rem',
  7: '3rem',
  8: '4rem',
  9: '6rem'
}

const sizes = {
  container: [640, 768, 1024, 1280],
  nav: '3rem',
  logo: 25
}

const borders = {
  light: '1px solid #e9ecef',
  default: '1px solid #dee2e6',
  dark: '1px solid #ced4da',
  darker: '1px solid #868e96',
  double: '2px solid #dee2e6'
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
  small: '0.125rem',
  medium: '0.25rem',
  large: '0.5rem',
  pill: '20rem',
  circle: '50%',
  default: '0.25rem'
}

const shadows = {
  light: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
  medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
  severe: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
}

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
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading'
}

const styles = {
  h1: {
    ...heading,
    fontSize: 5
  },
  h2: {
    ...heading,
    fontSize: 4
  },
  h3: {
    ...heading,
    fontSize: 3
  },
  h4: {
    ...heading,
    fontSize: 2
  },
  h5: {
    ...heading,
    fontSize: 1
  },
  h6: {
    ...heading,
    fontSize: 0
  },
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3
  },
  pre: {
    fontFamily: 'monospace',
    overflowX: 'auto',
    code: {
      color: 'inherit'
    }
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 'inherit'
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
    ':hover': {
      color: 'secondary'
    }
  }
}

const variants = {
  buttons: {
    base: {},
    primary: {
      variant: 'variants.buttons.base',
      color: 'white',
      bg: 'primary',
      borderRadius: 'medium'
    },
    outline: {
      variant: 'variants.buttons.base',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px'
    },
    secondary: {
      variant: 'variants.buttons.base',
      color: 'background',
      bg: 'secondary'
    },
    large: {
      variant: 'variants.buttons.base',
      px: 4,
      py: 3,
      fontSize: 3
    },
    transparent: {
      variant: 'variants.buttons.base',
      color: 'inherit',
      bg: 'transparent',
      ':hover,:focus': {
        color: 'primary',
        outline: 'none',
        boxShadow: '0 0 0 2px'
      }
    }
  }
}

const globalStyles = theme => ({
  html: {
    boxSizing: 'border-box'
  },
  '*, *::before, *::after': {
    boxSizing: 'inherit'
  },
  body: {
    margin: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fonts.body.join(),
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.body,
    lineHeight: theme.lineHeights.body,
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitTextSizeAdjust: '100%'
  },
  a: {
    color: theme.colors.primary,
    textDecoration: 'none'
  }
})

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
  variants,
  globalStyles
}
