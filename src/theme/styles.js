/**
 * Global styles
 */

import { alpha, darken, lighten, readable } from '.'

const block = {
  m: 0,
  mb: 3
}

const pseudo = {
  '::selection': {
    bg: alpha('primary', 0.6),
    color: readable('primary'),
    textShadow: 'text'
  }
}

const reboot = {
  '*, *:after, *:before': {
    boxSizing: 'border-box'
  },
  body: {
    m: 0,
    color: 'text',
    bg: 'background',
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
  },
  hr: {
    height: 1,
    my: 3,
    border: 0,
    color: 'inherit',
    bg: 'currentColor',
    opacity: 0.2
  },
  figure: {
    ...block
  },
  strong: {
    fontWeight: 'bolder'
  },
  small: {
    fontSize: '80%'
  },
  svg: {
    verticalAlign: 'text-bottom'
  }
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
    bg: 'light',
    transition: 'background 0.3s, border 0.3s'
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
    code: {
      display: 'block',
      overflow: 'auto',
      px: 3,
      py: 3,
      borderRadius: 'medium',
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
    px: 1,
    py: '0.125rem',
    borderRadius: 'small',
    bg: '#272822',
    color: '#f8f8f2',
    fontFamily: 'mono',
    fontSize: '87.5%',
    // fontVariantLigatures: 'common-ligatures',
    lineHeight: 'dense'
  }
  // kbd, samp
}

const table = {
  table: {
    ...block,
    display: 'block',
    overflow: 'auto',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  'th, td': {
    px: 3,
    py: 2,
    textAlign: 'left',
    border: 1,
    borderColor: 'border'
  },
  th: {
    fontWeight: 'bold'
  }
}

const form = {
  textarea: {
    appearance: 'none',
    overflow: 'auto',
    resize: 'vertical'
  }
}

const more = {
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
  //     bg: alpha('dark', 0.9),
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
}

export default {
  ...pseudo,
  ...reboot,
  ...typography,
  ...list,
  ...image,
  ...link,
  ...code,
  ...table,
  ...form,
  ...more
}
