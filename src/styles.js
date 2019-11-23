/**
 * Global styles
 */

import { alpha, darken, lighten, readable } from './utils/color'

const heading = {
  m: 0,
  mb: 3,
  color: null,
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading'
}

const prism = {
  color: '#f8f8f2', // 'text',
  bg: '#272822', // darken('background', 0.2),
  '.comment,.prolog,.doctype,.cdata': {
    color: 'slategray'
  },
  '.punctuation': {
    color: '#f8f8f2'
  },
  '.namespace': {
    opacity: '.7'
  },
  '.property,.tag,.constant,.symbol,.deleted': {
    color: '#f92672'
  },
  '.boolean,.number': {
    color: '#ae81ff'
  },
  '.selector,.attr-name,.string,.char,.builtin,.inserted': {
    color: '#a6e22e'
  },
  '.operator,.entity,.url,.language-css .string,.style .string,.variable': {
    color: '#f8f8f2'
  },
  '.atrule,.attr-value,.function,.class-name': {
    color: '#e6db74'
  },
  '.keyword': {
    color: '#66d9ef'
  },
  '.regex,.important': {
    color: '#fd971f'
  },
  '.important,.bold': {
    fontWeight: 'bold'
  },
  '.italic': {
    fontStyle: 'italic'
  },
  '.entity': {
    cursor: 'help'
  }
}

export default {
  '*': {
    boxSizing: 'border-box'
  },
  '::selection': {
    bg: alpha('primary', 0.6),
    color: readable('primary')
  },
  body: {
    m: 0,
    fontSize: 'body',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    color: 'text',
    bg: 'background',
    transition: 'background 0.3s, color 0.3s',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitTextSizeAdjust: '100%'
  },
  hr: {
    height: 1,
    my: 3,
    border: 0,
    bg: 'currentColor',
    opacity: 0.2
  },
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
    m: 0,
    mb: 3,
    ':last-child': {
      mb: 0
    }
  },
  ol: {
    m: 0,
    mb: 3
    // px: 4
  },
  ul: {
    m: 0,
    mb: 3
    // px: 4
  },
  blockquote: {
    m: 0,
    mb: 3,
    px: 3,
    py: 3,
    borderLeft: 4,
    borderColor: lighten('primary', 0.1),
    bg: 'light',
    borderRadius: 'medium'
  },
  pre: {
    overflowX: 'auto',
    m: 0,
    mb: 3,
    px: 3,
    py: 3,
    fontFamily: 'mono',
    code: {
      color: 'inherit'
    },
    ...prism
  },
  code: {
    fontFamily: 'mono',
    fontSize: '90%'
  },
  table: {
    display: 'block',
    overflowX: 'auto',
    m: 0,
    mb: 3,
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
  },
  img: {
    maxWidth: '100%'
  },
  textarea: {
    appearance: 'none'
  },
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
