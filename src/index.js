/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'

import { Wrapper } from './components'
import { ThemeProvider, Global } from './theme'

import theme from './utils/theme'
import styles from './utils/styles'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Global styles={styles} />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({ style: { opacity: 0, transition: 'opacity 1s' } })
}

export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.style.opacity = null
  })
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm('此应用程序已更新，重新加载以显示最新版本？')
  answer && window.location.reload()
}

export const registerServiceWorker = () => true
