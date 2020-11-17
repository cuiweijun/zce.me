/**
 * Global styles
 */

/** @typedef {import('@emotion/serialize').Interpolation<import('@emotion/react').Theme>} Interpolation */
import { rgba, darken, lighten, getLuminance } from 'polished'

const readable = (c, l, d) => (getLuminance(c) > 0.4 ? d : l)

/** @type {Interpolation} */
const variables = t => ({
  ':root': Object.keys(t.colors).reduce(
    (prev, item) => ({ ...prev, [`--c-${item}`]: t.colors[item] }),
    {}
  )
})

/** @type {Interpolation} */
const block = t => ({
  margin: `0 0 ${t.space[3]}`
})

/** @type {Interpolation} */
const pseudo = t => ({
  '::selection': {
    background: rgba(t.colors.primary, 0.6),
    color: readable(t.colors.primary),
    textShadow: 'text'
  }
})

/** @type {Interpolation} */
const reboot = t => ({
  '*, *:after, *:before': {
    boxSizing: 'border-box'
  },
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
  }
})

/** @type {Interpolation} */
const heading = t => ({
  ...block(t),
  lineHeight: t.lineHeights.heading,
  fontWeight: t.fontWeights.heading
})

/** @type {Interpolation} */
const typography = t => ({
  h1: {
    ...heading,
    fontSize: t.fontSizes[7]
  },
  h2: {
    ...heading,
    fontSize: t.fontSizes[6]
  },
  h3: {
    ...heading,
    fontSize: t.fontSizes[5]
  },
  h4: {
    ...heading,
    fontSize: t.fontSizes[4]
  },
  h5: {
    ...heading,
    fontSize: t.fontSizes[3]
  },
  h6: {
    ...heading,
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
  }
})

/** @type {Interpolation} */
const list = t => ({
  'ol, ul, dl': {
    ...block(t)
  },
  'ol, ul': {
    paddingLeft: t.space[5]
  },
  'ol ol, ul ul, ol ul, ul ol': {
    marginBottom: 0
  }
})

/** @type {Interpolation} */
const image = t => ({
  img: {
    maxWidth: '100%'
  }
})

/** @type {Interpolation} */
const link = t => ({
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

/** @type {Interpolation} */
const code = t => ({
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
  }
  // kbd, samp
})

/** @type {Interpolation} */
const table = t => ({
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
  }
})

/** @type {Interpolation} */
const form = t => ({
  textarea: {
    appearance: 'none',
    overflow: 'auto',
    resize: 'vertical'
  }
})

/** @type {Interpolation} */
const more = t => ({
  // '[data-title]': {
  //   position: 'relative',
  //   ':after': {
  //     position: 'absolute',
  //     left: '50%',
  //     bottom: '100%',
  //     zIndex: 70,
  //     overflow: 'hidden',
  //     display: 'block',
  //     px: 2,
  //     py: 1,
  //     borderRadius: 'medium',
  //     background: rgba('dark', 0.9),
  //     color: 'white',
  //     fontSize: '87.5%',
  //     textOverflow: 'ellipsis',
  //     whiteSpace: 'pre',
  //     content: 'attr(data-title)',
  //     opacity: 0,
  //     pointerEvents: 'none',
  //     transform: t => `translate(-50%, ${t.space[2]})`,
  //     transition: 'opacity .2s, transform .2s'
  //   },
  //   ':hover': {
  //     ':after': {
  //       opacity: 1,
  //       transform: t => `translate(-50%, -${t.space[1]})`
  //     }
  //   }
  // }
})

export default t => ({
  ...variables(t),
  ...pseudo(t),
  ...reboot(t),
  ...typography(t),
  ...list(t),
  ...image(t),
  ...link(t),
  ...code(t),
  ...table(t),
  ...form(t),
  ...more(t)
})
