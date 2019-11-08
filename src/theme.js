/**
 * Site theme
 */

import { darken } from '@theme-ui/color'

const colors = {
  transparent: 'transparent',
  white: '#fff',
  black: '#000',

  primary: '#339af0',
  secondary: '#22b8cf',
  accent: '#ff6b6b',
  highlight: '#fcc419',
  muted: '#868e96',
  light: '#e9ecef',
  gray: '#ced4da',
  dark: '#343a40',

  text: '#495057',
  background: '#f4f8fb',

  // Color Modes
  modes: {
    dark: {
      primary: '#f03e3e', // '#4dabf7',
      secondary: '#3bc9db',
      accent: '#ff8787',
      highlight: '#ffd43b',
      muted: '#868e96',
      light: 'rgba(255, 255, 255, 0.1)',
      gray: '#444d56',
      dark: '#212529',

      text: '#fff',
      background: '#212529' // '#0a0c0d'
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
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem'
}
fontSizes.body = fontSizes.md

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
  logo: '1.5625rem',
  icon: '1.5rem',
  card: '20rem'
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

// const heading = {
//   color: 'text',
//   fontFamily: 'heading',
//   lineHeight: 'heading',
//   fontWeight: 'heading'
// }

const styles = {
  // h1: {
  //   ...heading,
  //   fontSize: 5
  // },
  // h2: {
  //   ...heading,
  //   fontSize: 4
  // },
  // h3: {
  //   ...heading,
  //   fontSize: 3
  // },
  // h4: {
  //   ...heading,
  //   fontSize: 2
  // },
  // h5: {
  //   ...heading,
  //   fontSize: 1
  // },
  // h6: {
  //   ...heading,
  //   fontSize: 0
  // },
  // hr: {
  //   bg: 'muted',
  //   border: 0,
  //   height: '1px',
  //   m: 3
  // },
  // pre: {
  //   fontFamily: 'monospace',
  //   overflowX: 'auto',
  //   code: {
  //     color: 'inherit'
  //   }
  // },
  // code: {
  //   fontFamily: 'monospace',
  //   fontSize: 'inherit'
  // },
  // table: {
  //   width: '100%',
  //   borderCollapse: 'separate',
  //   borderSpacing: 0
  // },
  // th: {
  //   textAlign: 'left',
  //   borderBottomStyle: 'solid'
  // },
  // td: {
  //   textAlign: 'left',
  //   borderBottomStyle: 'solid'
  // },
  // a: {
  //   color: 'primary',
  //   textDecoration: 'none',
  //   ':hover': {
  //     color: 'secondary'
  //   }
  // }
}

const variants = {
  buttons: {
    base: {},
    default: {
      variant: 'variants.buttons.base',
      borderColor: 'gray',
      ':hover': {
        borderColor: 'gray',
        backgroundColor: 'light',
        color: 'text'
      },
      ':active': {
        borderColor: 'gray',
        backgroundColor: darken('light', 0.05),
        color: 'text'
      }
    },
    primary: {
      variant: 'variants.buttons.base',
      border: 'none',
      backgroundColor: 'primary',
      color: 'background',
      ':hover': {
        backgroundColor: darken('primary', 0.1),
        color: 'background'
      },
      ':active': {
        backgroundColor: darken('primary', 0.15),
        color: 'background'
      }
    },
    outline: {
      variant: 'variants.buttons.base',
      borderColor: 'primary',
      backgroundColor: 'transparent',
      color: 'primary',
      ':hover': {
        backgroundColor: 'primary',
        color: 'background'
      },
      ':active': {
        backgroundColor: darken('primary', 0.1),
        color: 'background'
      }
    },
    ghost: {
      variant: 'variants.buttons.outline',
      border: 'none'
    },
    elevated: {
      variant: 'variants.buttons.default',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)'
    }
  },
  links: {
    default: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        borderColor: 'currentColor',
        textDecoration: 'underline'
      }
    },
    inherit: {
      variant: 'variants.links.default',
      color: 'inherit'
    }
  },
  inputs: {
    base: {},
    default: {
      variant: 'variants.inputs.base',
      borderColor: 'gray'
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
