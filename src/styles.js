/**
 * Global styles
 */

import { rgba, darken, lighten } from 'polished'

const block = t => ({
  margin: `0 0 ${t.space[3]}`
})

const heading = t => ({
  ...block(t),
  lineHeight: t.lineHeights.heading,
  fontWeight: t.fontWeights.heading
})

/** @type {import('@emotion/serialize').Interpolation<import('@emotion/react').Theme>} */
const styles = t => ({
  // variables
  ':root': Object.entries(t.colors).reduce(
    (prev, [k, v]) => ({ ...prev, [`--c-${k}`]: v }),
    {}
  ),
  // pseudo
  '::selection': {
    background: rgba(t.colors.primary, 0.8),
    color: '#fff', // t.colors.background,
    textShadow: 'text'
  },
  '*, *:after, *:before': {
    boxSizing: 'border-box'
  },
  // reboot
  body: {
    margin: 0,
    color: t.colors.text,
    background: t.colors.background,
    fontSize: t.fontSizes.md,
    fontFamily: t.fonts.sans,
    fontWeight: t.fontWeights.normal,
    lineHeight: t.lineHeights.normal,
    WebkitTextSizeAdjust: '100%',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  },
  hr: {
    height: 1,
    margin: `${t.space[3]} 0`,
    border: 0,
    color: 'inherit',
    background: 'currentColor',
    opacity: 0.2
  },
  figure: {
    ...block(t)
  },
  strong: {
    fontWeight: t.fontWeights.bolder
  },
  small: {
    fontSize: '80%'
  },
  svg: {
    verticalAlign: 'text-bottom'
  },
  // typography
  h1: {
    ...heading(t),
    fontSize: t.fontSizes[7]
  },
  h2: {
    ...heading(t),
    fontSize: t.fontSizes[6]
  },
  h3: {
    ...heading(t),
    fontSize: t.fontSizes[5]
  },
  h4: {
    ...heading(t),
    fontSize: t.fontSizes[4]
  },
  h5: {
    ...heading(t),
    fontSize: t.fontSizes[3]
  },
  h6: {
    ...heading(t),
    fontSize: t.fontSizes[2]
  },
  p: {
    ...block(t)
  },
  blockquote: {
    ...block(t),
    padding: t.space[3],
    borderLeft: `8px solid ${lighten(0.1, t.colors.primary)}`,
    borderRadius: t.radii.medium,
    background: t.colors.light,
    '> :last-child': {
      marginBottom: 0
    }
  },
  // list
  'ol, ul, dl': {
    ...block(t)
  },
  'ol, ul': {
    paddingLeft: t.space[5]
  },
  'ol ol, ul ul, ol ul, ul ol': {
    marginBottom: 0
  },
  // table
  table: {
    ...block(t),
    display: 'block',
    overflow: 'auto',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  'th, td': {
    padding: `${t.space[2]} ${t.space[3]}`,
    textAlign: 'left',
    border: `1px solid ${t.colors.border}`
  },
  th: {
    fontWeight: t.fontWeights.bold
  },
  // form
  textarea: {
    appearance: 'none',
    overflow: 'auto',
    resize: 'vertical'
  },
  // code
  pre: {
    ...block(t),
    code: {
      display: 'block',
      overflow: 'auto',
      padding: t.space[3],
      borderRadius: t.radii.medium,
      lineHeight: 'inherit',
      wordWrap: 'normal',
      wordBreak: 'normal'
    },
    '.comment, .prolog, .doctype, .cdata': {
      color: 'slategray'
    },
    '.punctuation': {
      color: '#f8f8f2'
    },
    '.namespace': {
      opacity: '.7'
    },
    '.property, .tag, .constant, .symbol, .deleted': {
      color: '#f92672'
    },
    '.boolean, .number': {
      color: '#ae81ff'
    },
    '.selector, .attr-name, .string, .char, .builtin, .inserted': {
      color: '#a6e22e'
    },
    '.operator, .entity, .url, .language-css .string, .style .string, .variable': {
      color: '#f8f8f2'
    },
    '.atrule, .attr-value, .function, .class-name': {
      color: '#e6db74'
    },
    '.keyword': {
      color: '#66d9ef'
    },
    '.regex, .important': {
      color: '#fd971f'
    },
    '.important, .bold': {
      fontWeight: 'bold'
    },
    '.italic': {
      fontStyle: 'italic'
    },
    '.entity': {
      cursor: 'help'
    }
  },
  code: {
    padding: `0.125rem ${t.space[1]}`,
    borderRadius: t.radii.small,
    background: '#272822',
    color: '#f8f8f2',
    fontFamily: t.fonts.mono,
    fontSize: '87.5%',
    // fontVariantLigatures: 'common-ligatures',
    lineHeight: t.lineHeights.dense
  },
  // image
  img: {
    maxWidth: '100%'
  },
  // link
  a: {
    color: t.colors.primary,
    textDecoration: 'none',
    transition: 'color 0.25s',
    ':hover': {
      color: darken(0.05, t.colors.primary),
      textDecoration: 'underline'
    },
    ':active': {
      color: darken(0.1, t.colors.primary)
    }
  }
})

export default styles
