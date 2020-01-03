/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateBabelConfig = async ({ actions }) => {
  const pragmaName = '___ThemeJSX'

  actions.setBabelPlugin({
    name: 'babel-plugin-emotion',
    options: {
      sourceMap: process.env.NODE_ENV !== 'production',
      autoLabel: process.env.NODE_ENV !== 'production',
      cssPropOptimization: true
    }
  })

  actions.setBabelPlugin({
    name: '@emotion/babel-plugin-jsx-pragmatic',
    options: {
      module: require.resolve('../../src/utils'),
      export: 'jsx',
      import: pragmaName
    }
  })

  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      pragma: pragmaName,
      pragmaFrag: 'React.Fragment'
    }
  })
}
