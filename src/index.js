/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'

import { Wrapper } from './components'
import { ThemeProvider, InitializeColorMode } from './theme'

import theme from './theme/theme'
import styles from './theme/styles'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme} styles={styles}>
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(InitializeColorMode())
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'This application has been updated. Reload to display the latest version?'
  )
  answer && window.location.reload()
}

export const registerServiceWorker = () => true
