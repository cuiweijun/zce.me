/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Import global styles

// typefaces
// import 'typeface-source-sans-pro'
// import 'typeface-merriweather'
// import 'typeface-source-code-pro'

// global styles
import './src/styles/main.scss'

// https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
// https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
export const wrapRootElement = ({ element }) => element

// https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
export const wrapPageElement = ({ element }) => element
