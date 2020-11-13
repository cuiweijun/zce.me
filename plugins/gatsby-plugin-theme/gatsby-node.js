/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 * Ref:
 * - https://github.com/emotion-js/emotion/blob/master/packages/babel-preset-css-prop/src/index.js
 */

// @ts-check

// jsx pragmatic

/** @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']} */
exports.onCreateBabelConfig = async ({ actions }) => {
  const pragmaName = '___ThemeJSX'

  // https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin#options
  actions.setBabelPlugin({
    name: '@emotion/babel-plugin',
    options: {}
  })

  // https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-jsx-pragmatic
  actions.setBabelPlugin({
    name: '@emotion/babel-plugin-jsx-pragmatic',
    options: {
      module: require.resolve('../../src/utils'),
      export: 'jsx',
      import: pragmaName
    }
  })

  // https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      pragma: pragmaName,
      pragmaFrag: 'React.Fragment'
    }
  })
}
