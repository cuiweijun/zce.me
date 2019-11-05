/**
 * Site theme
 * ref: https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
 */

import preset from '@rebass/preset'

// Breakpoints
const breakpoints = ['640px', '768px', '1024px', '1280px']

// Colors
const colors = {
  text: '#000',
  background: '#fff',

  transparent: 'transparent',
  white: '#fff',
  black: '#000',
  gray: '#868e96',

  primary: '#339af0',
  secondary: '#495057',
  highlight: '#ff6b6b',
  accent: '#ff6b6b',
  muted: '#868e96',
  light: '#e9ecef',
  dark: '#495057',

  // Color Modes
  modes: {}
}

// Sizes
const sizes = {
  ...preset.sizes,
  nav: 50,
  logo: 30
}

// Styles
const styles = {
  ...preset.styles,
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover, &:active, &:focus': {}
  }
}

// Variants
const variants = {
  ...preset.variants,
  link: {
    color: 'primary',
    textDecoration: 'none',
    ':hover, &:active, &:focus': {}
  },
  nav: {
    mx: 3,
    px: 1,
    listStyle: 'none'
  },
  navItem: {
    display: 'block',
    p: 2
  }
}

export default {
  ...preset,
  colors,
  breakpoints,
  sizes,
  styles,
  variants
}

// const mediaQueries = {
//   small: `@media screen and (min-width: ${breakpoints[0]})`,
//   medium: `@media screen and (min-width: ${breakpoints[1]})`,
//   large: `@media screen and (min-width: ${breakpoints[2]})`
// }

// // Spacings
// const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

// // Typography
// const fonts = {
//   body: 'system-ui, sans-serif',
//   heading: '"Avenir Next", sans-serif',
//   monospace: 'Menlo, monospace'
// }

// const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64]

// const fontWeights = {
//   body: 400,
//   heading: 800,
//   bold: 700,
//   display: 800
// }

// const lineHeights = {
//   body: 1.5,
//   heading: 1.125
// }

// const letterSpacings = {}

// const borders = {}

// const borderWidths = {}

// const borderStyles = {}

// const radii = {}

// const shadows = {}

// const zIndices = {}

// const transitions = {}

// // Styles
// const heading = {
//   color: 'text',
//   fontFamily: 'heading',
//   lineHeight: 'heading',
//   fontWeight: 'heading'
// }

// const styles = {
//   root: {
//     fontFamily: 'body',
//     lineHeight: 'body',
//     fontWeight: 'body'
//   },
//   h1: {
//     ...heading,
//     fontSize: 5
//   },
//   h2: {
//     ...heading,
//     fontSize: 4
//   },
//   h3: {
//     ...heading,
//     fontSize: 3
//   },
//   h4: {
//     ...heading,
//     fontSize: 2
//   },
//   h5: {
//     ...heading,
//     fontSize: 1
//   },
//   h6: {
//     ...heading,
//     fontSize: 0
//   },
//   pre: {
//     fontFamily: 'monospace',
//     overflowX: 'auto',
//     code: {
//       color: 'inherit'
//     }
//   },
//   code: {
//     fontFamily: 'monospace',
//     fontSize: 'inherit'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'separate',
//     borderSpacing: 0
//   },
//   th: {
//     textAlign: 'left',
//     borderBottomStyle: 'solid'
//   },
//   td: {
//     textAlign: 'left',
//     borderBottomStyle: 'solid'
//   }
// }

// // Variants
// const variants = {
//   buttons: {
//     primary: {
//       color: 'background',
//       bg: 'primary',
//     },
//     secondary: {
//       color: 'background',
//       bg: 'secondary',
//     },
//     gray: {
//       color: 'background',
//       bg: 'gray',
//     },
//   },
// }

// // Export theme
// export default {
//   useCustomProperties: true,
//   useColorSchemeMediaQuery: true,
//   initialColorMode: 'default',
//   colors,
//   breakpoints,
//   mediaQueries,
//   space,
//   fonts,
//   fontSizes,
//   fontWeights,
//   lineHeights,
//   letterSpacings,
//   sizes,
//   borders,
//   borderWidths,
//   borderStyles,
//   radii,
//   shadows,
//   zIndices,
//   transitions,
//   styles,
//   variants
// }
