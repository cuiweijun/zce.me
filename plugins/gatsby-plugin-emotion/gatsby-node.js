/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateBabelConfig = async ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-emotion',
    options: {
      sourceMap: process.env.NODE_ENV !== 'production',
      autoLabel: process.env.NODE_ENV !== 'production',
      cssPropOptimization: true
    }
  })
}
