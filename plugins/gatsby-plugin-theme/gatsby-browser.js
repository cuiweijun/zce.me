/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 *
 * Ref:
 * - https://github.com/emotion-js/emotion/blob/master/site/plugins/gatsby-plugin-emotion-next-compat/gatsby-browser.js
 */

// @ts-check

import React from 'react'
import { CacheProvider, Global } from '@emotion/react'

import cache from './emotion-cache'
import ThemeProvider from './theme-provider'

import theme from '../../src/theme'
import styles from '../../src/styles'

/** @type {import('gatsby').GatsbyBrowser['wrapRootElement']} */
export const wrapRootElement = ({ element }) => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <Global styles={styles} />
      {element}
    </ThemeProvider>
  </CacheProvider>
)

// for prevent flashing
/** @type {import('gatsby').GatsbyBrowser['onClientEntry']} */
export const onClientEntry = () => {
  window.addEventListener('themeready', () => {
    // ensure theme color mode ready
    document.body.style.opacity = null
  })
}
