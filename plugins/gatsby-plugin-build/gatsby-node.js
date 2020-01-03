/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// https://www.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = async ({ stage, getConfig, actions }) => {
  if (stage === 'build-javascript') {
    const config = getConfig()
    // disable source map
    config.devtool = false
    // rename output bundle
    config.output.filename = '[contenthash:6].js'
    config.output.chunkFilename = '[contenthash:6].js'
    actions.replaceWebpackConfig(config)
  }
}
