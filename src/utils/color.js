import { getLuminance } from 'polished'

import { get } from '@styled-system/css'

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '')

export const readable = (c, l = '#fff', d = '#000') => t =>
  getLuminance(g(t, c)) > 0.4 ? g(t, d) : g(t, l)

export * from '@theme-ui/color'
