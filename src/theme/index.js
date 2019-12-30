import React from 'react'
import { jsx as emotion, Global } from '@emotion/core'
import { ThemeProvider as EmotionProvider, useTheme } from 'emotion-theming'
import * as p from 'polished'

const storageKey = 'color-mode'
const varPrefix = '--c-'

const defaultTheme = {}
const defaultStyles = {}

// =============================================================================
// Delve get
// ref: https://github.com/developit/dlv/blob/master/index.js
// =============================================================================

const get = (obj, key, def) => {
  key = key && key.split ? key.split('.') : [key]
  key.forEach(key => {
    obj = obj ? obj[key] : undefined
  })
  return obj === undefined ? def : obj
}

// =============================================================================
// Themed css
// ref: https://github.com/styled-system/styled-system/blob/master/packages/css/src/index.js
// =============================================================================

const scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors'
}

const aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
}

const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
}

const responsive = styles => theme => {
  const next = {}
  const breakpoints = get(theme, 'breakpoints', defaultTheme.breakpoints)
  const mediaQueries = [
    null,
    ...breakpoints.map(n => `@media screen and (min-width: ${n})`)
  ]

  for (const key in styles) {
    const value =
      typeof styles[key] === 'function' ? styles[key](theme) : styles[key]

    if (value == null) continue
    if (!Array.isArray(value)) {
      next[key] = value
      continue
    }

    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i]
      if (value[i] == null) continue
      if (!media) {
        next[key] = value[i]
        continue
      }
      next[media] = next[media] || {}
      next[media][key] = value[i]
    }
  }

  return next
}

const negative = (scale, value) => {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value, value)
  }
  const absolute = Math.abs(value)
  const n = get(scale, absolute, absolute)
  if (typeof n === 'string') return '-' + n
  return n * -1
}

const shouldTransforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right'
]

const transforms = shouldTransforms.reduce(
  (prev, current) => ({ ...prev, [current]: negative }),
  {}
)

export const css = args => (props = {}) => {
  const theme = { ...defaultTheme, ...(props.theme || props) }
  const obj = typeof args === 'function' ? args(theme) : args
  const styles = responsive(obj)(theme)
  const result = {}

  for (const key in styles) {
    const x = styles[key]
    const val = typeof x === 'function' ? x(theme) : x

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme)
      Object.assign(result, variant)
      continue
    }

    if (val && typeof val === 'object') {
      result[key] = css(val)(theme)
      continue
    }

    const prop = get(aliases, key, key)
    const scaleName = get(scales, prop)
    const scale = get(theme, scaleName, get(theme, prop, {}))
    const transform = get(transforms, prop, get)
    const value = transform(scale, val, val)

    if (multiples[prop]) {
      for (const item of multiples[prop]) {
        result[item] = value
      }
    } else {
      result[prop] = value
    }
  }

  return result
}

// =============================================================================
// Color utils
// ref: https://github.com/system-ui/theme/blob/master/packages/color/src/index.js
// =============================================================================

const g = (t, c) => get(t, `rawColors.${c}`, c)

export const darken = (c, n) => t => p.darken(n, g(t, c))
export const lighten = (c, n) => t => p.lighten(n, g(t, c))
// export const rotate = (c, d) => t => p.adjustHue(d, g(t, c))
// export const hue = (c, h) => t => p.setHue(h, g(t, c))
// export const saturation = (c, s) => t => p.setSaturation(s, g(t, c))
// export const lightness = (c, l) => t => p.setLightness(l, g(t, c))
// export const desaturate = (c, n) => t => p.desaturate(n, g(t, c))
// export const saturate = (c, n) => t => p.saturate(n, g(t, c))
// export const shade = (c, n) => t => p.shade(n, g(t, c))
// export const tint = (c, n) => t => p.tint(n, g(t, c))
export const alpha = (c, n) => t => p.rgba(g(t, c), n)
// export const mix = (a, b, n = 0.5) => t => p.mix(n, g(t, a), g(t, b))
// export const complement = c => t => p.complement(g(t, c))
// export const invert = c => t => p.invert(g(t, c))
// export const grayscale = c => t => p.grayscale(g(t, c))
export const readable = (c, l = 'white', d = 'black') => t =>
  p.getLuminance(g(t, c)) > 0.4 ? g(t, d) : g(t, l)

// =============================================================================
// jsx for sx prop
// ref: https://github.com/system-ui/theme/blob/master/packages/theme/src/jsx.js
// =============================================================================

const parseProps = props => {
  if (!props || !props.sx) return props

  const next = { ...props }
  delete next.sx

  next.css = theme => {
    const styles = css(props.sx)(theme)
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css
    return [styles, raw]
  }

  return next
}

export const jsx = (type, props, ...children) => {
  return emotion(type, parseProps(props), ...children)
}

// =============================================================================
// ThemeProvider wrapper
// =============================================================================

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'default'
  const mode = localStorage.getItem(storageKey)
  if (mode) return mode
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? 'dark' : 'default'
}

const colorModeStyles = theme => {
  const { modes, ...colors } = theme.rawColors

  const styles = {}

  styles[':root'] = {}
  for (const name in colors) {
    styles[':root'][varPrefix + name] = colors[name]
  }

  // modes
  for (const mode in modes) {
    styles[`:root.${mode}`] = {}
    for (const name in modes[mode]) {
      styles[`:root.${mode}`][varPrefix + name] = modes[mode][name]
    }
  }

  return styles
}

export const ThemeProvider = ({ theme, styles, children }) => {
  const [mode, setMode] = React.useState(getInitialMode())

  React.useEffect(() => document.documentElement.classList.remove(mode))

  theme = { ...defaultTheme, ...theme }
  styles = css({ ...defaultStyles, ...styles })

  const { modes = {}, ...rest } = theme.colors || {}

  const colors = { ...rest, ...modes[mode] }
  const rawColors = { ...colors, modes }

  // custom properties
  // for (const [name, color] of Object.entries(colors)) {
  //   colors[name] = `var(${varPrefix}${name}, ${color})`
  // }

  // custom properties without defaults
  for (const name in colors) {
    colors[name] = `var(${varPrefix}${name})`
  }

  const context = {
    ...theme,
    colors,
    rawColors,
    colorMode: mode,
    setColorMode: value => {
      if (value === mode) return
      localStorage.setItem(storageKey, value)
      setMode(value)
    }
  }

  return (
    <EmotionProvider theme={context}>
      <Global styles={colorModeStyles} />
      <Global styles={styles} />
      {children}
    </EmotionProvider>
  )
}

export { useTheme }

// =============================================================================
// Color mode API
// =============================================================================

export const useColorMode = () => {
  const { colorMode, setColorMode } = useTheme()
  return [colorMode, setColorMode]
}

export const InitializeColorMode = () => (
  <script
    id="theme-no-flash"
    key="theme-no-flash"
    dangerouslySetInnerHTML={{
      __html: `(function() { try {
        var mode = localStorage.getItem('${storageKey}');
        mode && document.documentElement.classList.add(mode);
      } catch (e) {} })();`
    }}
  />
)