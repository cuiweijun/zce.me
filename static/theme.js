/**
 * Site theme preset & typography.js options
 *
 * - https://theme-ui.com/theme-spec/
 * - https://system-ui.com/theme/
 * - https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
 * - https://github.com/KyleAMathews/typography.js#configuration
 *
 * > quaternary, quinary, senary, septenary, octonary, nonary, denary
 */

import oc from 'open-color'

export const colors = {
  text: oc.gray[8],
  background: oc.gray[0],
  primary: oc.red[5],
  secondary: oc.grape[4],
  accent: oc.red[6],
  muted: oc.gray[6],

  darkest: oc.gray[9],
  darker: oc.gray[8],
  dark: oc.gray[7],
  gray: oc.gray[5],
  light: oc.gray[3],
  lighter: oc.gray[1],
  lightest: oc.gray[0]
}

export const options = {
  title: 'zce.me',
  baseFontSize: '18px',
  baseLineHeight: 1.56,
  googleFonts: [
    {
      name: 'Source Sans Pro',
      styles: ['200', '400', '400i', '700']
    }
  ],
  scaleRatio: 2.5,
  // body: 'system-ui, sans-serif', heading: 'Georgia, serif', monospace: 'Menlo, monospace'
  headerFontFamily: ['Source Sans Pro', 'sans-serif'],
  bodyFontFamily: ['Source Sans Pro', 'sans-serif'],
  headerColor: colors.text,
  bodyColor: colors.text,
  headerWeight: 200,
  bodyWeight: 400,
  boldWeight: 700,
  blockMarginBottom: 1,
  includeNormalize: false
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const media = {
  up: {
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`
  },
  down: {
    sm: `@media (max-width: ${breakpoints.sm - 0.02}px)`,
    md: `@media (max-width: ${breakpoints.md - 0.02}px)`,
    lg: `@media (max-width: ${breakpoints.lg - 0.02}px)`,
    xl: `@media (max-width: ${breakpoints.xl - 0.02}px)`
  }
}
