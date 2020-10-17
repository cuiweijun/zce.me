/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/node-apis/
 * - https://www.gatsbyjs.org/docs/add-custom-webpack-config/
 */

// @ts-check

/** @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']} */
exports.onCreateWebpackConfig = async ({ stage, getConfig, actions }) => {
  if (stage === 'build-javascript') {
    const config = getConfig()
    // disable source map
    config.devtool = false
    // rename output bundle
    config.output.filename = '[contenthash:6].js'
    config.output.chunkFilename = '[contenthash:6].js'
    // css https://github.com/imdaveead/plugins/blob/539e3d7f5472b5ef04f5f52fd87e6030935a2e7d/gatsby-plugin-hidenames/gatsby-node.js
    actions.replaceWebpackConfig(config)
  }
}
