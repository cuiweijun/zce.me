/**
 * Color utils
 * ref: https://github.com/system-ui/theme-ui/blob/master/packages/color/src/index.js
 * TODO: remove polished
 */

import * as p from 'polished'
import { get } from 'theme-ui'

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '')

export const darken = (c, n) => t => p.darken(n, g(t, c))
export const lighten = (c, n) => t => p.lighten(n, g(t, c))
// export const rotate = (c, d) => t => p.adjustHue(d, g(t, c))

// export const hue = (c, h) => t => p.setHue(h, g(t, c))
// export const saturation = (c, s) => t => p.setSaturation(s, g(t, c))
// export const lightness = (c, l) => t => p.setLightness(l, g(t, c))

// export const desaturate = (c, n) => t => p.desaturate(n, g(t, c))
// export const saturate = (c, n) => t => p.saturate(n, g(t, c))

export const shade = (c, n) => t => p.shade(n, g(t, c))
export const tint = (c, n) => t => p.tint(n, g(t, c))

export const alpha = (c, n) => t => p.rgba(g(t, c), n)

// export const mix = (a, b, n = 0.5) => t => p.mix(n, g(t, a), g(t, b))

// export const complement = c => t => p.complement(g(t, c))
// export const invert = c => t => p.invert(g(t, c))

// export const grayscale = c => t => p.grayscale(g(t, c))

export const readable = (c, l = 'white', d = 'black') => t =>
  p.getLuminance(g(t, c)) > 0.4 ? g(t, d) : g(t, l)
