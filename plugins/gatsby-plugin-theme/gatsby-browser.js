/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'

import { ThemeProvider, Global } from '../../src/utils'

import theme from '../../src/theme'
import styles from '../../src/styles'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <Global styles={styles} />
      {element}
    </ThemeProvider>
  </CacheProvider>
)

// for prevent flashing
export const onClientEntry = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = null
      document.body.style.background = null
    }, 100)
  })
}
