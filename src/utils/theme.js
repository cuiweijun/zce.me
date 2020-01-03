/**
 * Site theme
 */

// TODO: Redesign colors
// transparent, white, black
// primary, secondary, accent,
// highlight, muted
// light, dark
// text, background, border

export default {
  colors: {
    primary: '#15aabf',
    muted: '#717a82',
    light: '#f1f3f5',
    dark: '#495057',
    text: '#343a40',
    background: '#f8f9fa',
    border: '#dee2e6'
  },
  // prettier-ignore
  fonts: {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: '"Fira Code", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  fontSizes: {
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
    10: '5rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
    bolder: 700
  },
  lineHeights: {
    solid: 1,
    dense: 1.125,
    normal: 1.5,
    loose: 1.75,
    double: 2
  },
  breakpoints: ['640px', '768px', '1024px', '1280px'],
  space: [
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
  ],
  sizes: {
    container: '75rem',
    inner: '50rem',
    nav: '3rem'
  },
  borders: [
    0,
    '1px solid transparent',
    '2px solid transparent',
    '4px solid transparent',
    '8px solid transparent',
    '16px solid transparent',
    '24px solid transparent'
  ],
  radii: {
    none: 0,
    small: '0.1875rem',
    medium: '0.25rem',
    large: '0.5rem',
    pill: '20rem',
    circle: '50%'
  },
  shadows: {
    outline: '0 0 0 0.2rem rgba(0, 123, 255, 0.2)',
    underline: 'inset 0 -1px 0 currentColor',
    text: '0 0 0.25rem rgba(0, 0, 0, 0.4)',
    light: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)',
    medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)',
    severe: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'
  },
  modes: {
    dark: {
      colors: {
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
}
