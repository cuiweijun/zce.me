// TODO: remove polished
import * as polished from 'polished'
import { get } from 'theme-ui'

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '')

export const darken = (c, n) => t => polished.darken(n, g(t, c))
export const lighten = (c, n) => t => polished.lighten(n, g(t, c))
export const rotate = (c, d) => t => polished.adjustHue(d, g(t, c))

export const hue = (c, h) => t => polished.setHue(h, g(t, c))
export const saturation = (c, s) => t => polished.setSaturation(s, g(t, c))
export const lightness = (c, l) => t => polished.setLightness(l, g(t, c))

export const desaturate = (c, n) => t => polished.desaturate(n, g(t, c))
export const saturate = (c, n) => t => polished.saturate(n, g(t, c))

export const shade = (c, n) => t => polished.shade(n, g(t, c))
export const tint = (c, n) => t => polished.tint(n, g(t, c))

export const alpha = (c, n) => t => polished.rgba(g(t, c), n)

export const mix = (a, b, n = 0.5) => t => polished.mix(n, g(t, a), g(t, b))

export const complement = c => t => polished.complement(g(t, c))
export const invert = c => t => polished.invert(g(t, c))

export const grayscale = (c, n) => desaturate(c, 1)
export const readable = (c, l = '#fff', d = '#000') => t =>
  polished.getLuminance(g(t, c)) > 0.4 ? g(t, d) : g(t, l)
