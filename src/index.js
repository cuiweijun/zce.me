/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { ThemeProvider, InitializeColorMode } from 'theme-ui'
import { Global } from '@emotion/core'

import theme from './utils/theme'
import styles from './utils/styles'

import { Wrapper } from './components'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    {/* https://github.com/system-ui/theme-ui/issues/499 */}
    {/* <ColorMode /> */}
    <Global styles={styles} />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(InitializeColorMode())
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'This application has been updated. Reload to display the latest version?'
  )
  answer && window.location.reload()
}

export const registerServiceWorker = () => true
