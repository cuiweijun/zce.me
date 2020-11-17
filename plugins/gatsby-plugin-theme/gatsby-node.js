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
  actions.setBabelPreset({
    name: '@emotion/babel-preset-css-prop',
    options: {}
  })
}
