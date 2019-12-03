/**
 * Global styles
 */

import { css } from 'theme-ui'
import { alpha, darken, lighten, readable, get } from './color'

const block = {
  m: 0,
  mb: 3
}

const pseudo = {
  '::selection': {
    bg: alpha('primary', 0.6),
    color: readable('primary')
  }
}

// colors var
const colors = {
  '--theme-ui-colors-transparent': t => get(t, 'transparent'),
  '--theme-ui-colors-white': t => get(t, 'white'),
  '--theme-ui-colors-black': t => get(t, 'black'),
  '--theme-ui-colors-primary': t => get(t, 'primary'),
  '--theme-ui-colors-secondary': t => get(t, 'secondary'),
  '--theme-ui-colors-accent': t => get(t, 'accent'),
  '--theme-ui-colors-highlight': t => get(t, 'highlight'),
  '--theme-ui-colors-muted': t => get(t, 'muted'),
  '--theme-ui-colors-light': t => get(t, 'light'),
  // '--theme-ui-colors-gray': t => get(t, 'gray'),
  '--theme-ui-colors-dark': t => get(t, 'dark'),
  '--theme-ui-colors-text': t => get(t, 'text'),
  '--theme-ui-colors-background': t => get(t, 'background'),
  '--theme-ui-colors-border': t => get(t, 'border'),
  '&.theme-ui-dark': {
    '--theme-ui-colors-primary': t => get(t, 'modes.dark.primary'),
    '--theme-ui-colors-secondary': t => get(t, 'modes.dark.secondary'),
    '--theme-ui-colors-accent': t => get(t, 'modes.dark.accent'),
    '--theme-ui-colors-highlight': t => get(t, 'modes.dark.highlight'),
    '--theme-ui-colors-muted': t => get(t, 'modes.dark.muted'),
    '--theme-ui-colors-light': t => get(t, 'modes.dark.light'),
    // '--theme-ui-colors-gray': t => get(t, 'modes.dark.gray'),
    '--theme-ui-colors-dark': t => get(t, 'modes.dark.dark'),
    '--theme-ui-colors-text': t => get(t, 'modes.dark.text'),
    '--theme-ui-colors-background': t => get(t, 'modes.dark.background'),
    '--theme-ui-colors-border': t => get(t, 'modes.dark.border')
  },
  color: 'text',
  bg: 'background'
}

const reboot = {
  '*, ::after, ::before': {
    boxSizing: 'border-box'
  },
  // ':root': {
  //   // fontSize: 16
  //   '--color-primary': t => get(t, 'primary')
  // },
  body: {
    ...colors,
    m: 0,
    fontSize: 'body',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    transition: 'background 0.3s, color 0.3s',
    WebkitTextSizeAdjust: '100%',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  }
  // '[tabindex="-1"]:focus:not(:focus-visible)': {
  //   outline: '0 !important'
  // },
  // hr: {
  //   height: 1,
  //   my: 3,
  //   border: 0,
  //   color: 'inherit',
  //   bg: 'currentColor',
  //   opacity: 0.2
  // }
}

const heading = {
  ...block,
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading'
}

const typography = {
  h1: {
    ...heading,
    fontSize: 7
  },
  h2: {
    ...heading,
    fontSize: 6
  },
  h3: {
    ...heading,
    fontSize: 5
  },
  h4: {
    ...heading,
    fontSize: 4
  },
  h5: {
    ...heading,
    fontSize: 3
  },
  h6: {
    ...heading,
    fontSize: 2
  },
  p: {
    ...block,
    ':last-child': {
      mb: 0
    }
  },
  blockquote: {
    ...block,
    p: 3,
    borderLeft: 4,
    borderColor: lighten('primary', 0.1),
    borderRadius: 'medium',
    bg: 'light'
  }
}

const list = {
  'ol, ul, dl': {
    ...block
  },
  'ol, ul': {
    pl: 5
  },
  'ol ol, ul ul, ol ul, ul ol': {
    mb: 0
  }
}

const image = {
  img: {
    maxWidth: '100%'
  }
}

const link = {
  a: {
    color: 'primary',
    textDecoration: 'none',
    // transition: 'box-shadow 0.25s',
    ':hover': {
      color: darken('primary', 0.05),
      textDecoration: 'underline'
      // boxShadow: 'underline'
    },
    ':active': {
      color: darken('primary', 0.1)
    }
  }
}

const code = {
  pre: {
    ...block,
    overflowX: 'auto',
    px: 3,
    py: 3,
    fontFamily: 'mono',
    color: '#f8f8f2', // 'text',
    bg: '#272822', // darken('background', 0.2),
    code: {
      color: 'inherit'
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
    fontFamily: 'mono',
    fontSize: '90%'
  }
}

const table = {
  table: {
    ...block,
    display: 'block',
    overflowX: 'auto',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  th: {
    px: 3,
    py: 2,
    textAlign: 'left',
    borderWidth: 1
  },
  td: {
    px: 3,
    py: 2,
    textAlign: 'left',
    borderWidth: 1
  }
}

const form = {
  textarea: {
    appearance: 'none',
    overflow: 'auto',
    resize: 'vertical'
  }
}

export default css({
  ...pseudo,
  ...reboot,
  ...typography,
  ...list,
  ...image,
  ...link,
  ...code,
  ...table,
  ...form
})
