import { colors, media } from './theme'

export default ({ rhythm, scale }) => ({
  body: {
    border: `${rhythm(0.5)} solid ${colors.lighter}`,
    minHeight: '100vh',
    WebkitFontSmoothing: `antialiased`,
    MozOsxFontSmoothing: `grayscale`,
    textRendering: `optimizeLegibility`
  },
  a: {
    color: colors.primary,
    textDecoration: 'none'
  },
  'a:hover': {
    opacity: 0.8,
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 2px, ${colors.primary} 2px, ${colors.primary} 3px, rgba(0, 0, 0, 0) 3px)`
  },
  'a:active': {
    opacity: 0.95
  },
  blockquote: {
    padding: `${rhythm(1 / 2)} ${rhythm(3 / 4)}`,
    marginLeft: 0,
    marginRight: 0,
    borderLeft: `${rhythm(1 / 4)} solid ${colors.light}`,
    color: colors.muted
  },
  [media.down.sm]: {
    body: {
      borderWidth: rhythm(0.25)
    },
    blockquote: {
      marginLeft: rhythm(-3 / 4),
      marginRight: 0,
      paddingLeft: rhythm(1 / 2)
    },
    table: {
      ...scale(-1 / 5)
    }
  }
})
