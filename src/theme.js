/**
 * Site theme preset
 *
 * - https://system-ui.com/theme/
 *
 * > quaternary, quinary, senary, septenary, octonary, nonary, denary
 */

import oc from 'open-color'

export const colors = {
  primary: oc.red[5],
  secondary: oc.grape[4],
  accent: oc.red[6],
  muted: oc.gray[6],
  dark: oc.gray[7],
  light: oc.gray[3]
}

export const fonts = {
  sans: 'system-ui, sans-serif',
  serif: 'Georgia, serif',
  monospace: 'Menlo, monospace'
}

fonts.body = fonts['sans']
fonts.heading = fonts['serif']

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64]

fontSizes.small = fontSizes[1]
fontSizes.medium = fontSizes[2]
fontSizes.large = fontSizes[3]
fontSizes.body = fontSizes[2]
fontSizes.display = fontSizes[5]

export const fontWeights = {
  light: 300,
  normal: 400,
  bold: 700
}

export const lineHeights = {
  solid: 1,
  dense: 1.25,
  default: 1.5,
  loose: 1.75
}

export const letterSpacings = {
  normal: `normal`,
  tracked: `0.075em`,
  tight: `-0.015em`
}

export const space = [0, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128]

space.small = space[1]
space.medium = space[2]
space.large = space[3]

export const sizes = {}

export const borders = [0, '1px solid']

export const radii = [0, 2, 4, 8, 16, 9999, `100%`]

export const shadows = {
  small: '0 1px 1px rgba(27, 31, 35, 0.1)',
  medium: '0 1px 5px rgba(27, 31, 35, 0.15)',
  large: '0 1px 15px rgba(27, 31, 35, 0.15)'
}

export const zIndices = {}

export const transitions = {}

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
