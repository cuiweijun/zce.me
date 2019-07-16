/**
 * Typography.js
 *
 * TODO: plugin toolbox args
 */

import Typography from 'typography'

import { colors, options, breakpoints, media } from './theme'

import global from './global'
import code from './code'
import sample from './sample'

// load module styles as plugin
options.plugins = [global, code, sample]

const typography = new Typography(options)

// export theme preset
export { colors, options, breakpoints, media }

// export typography utilities
export const { rhythm, scale } = typography

// export for gatsby-plugin-typography
export default typography
