/**
 * Global styles
 */

import { css } from 'theme-ui'
import { alpha, darken, lighten, readable } from './color'

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

const reboot = {
  '*, ::after, ::before': {
    boxSizing: 'border-box'
  },
  ':root': {
    // fontSize: 16
    '--color-primary': t => t.colors.primary
  },
  body: {
    m: 0,
    fontSize: 'body',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    transition: 'background 0.3s, color 0.3s',
    // color: 'text',
    // bg: 'background',
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
