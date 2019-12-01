/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { ThemeProvider, ColorMode, InitializeColorMode } from 'theme-ui'
import { Global } from '@emotion/core'

import theme from './theme'
import styles from './styles'

import { Wrapper } from './components'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Global styles={styles} />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

// TODO: theme-ui color mode & no flash
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(InitializeColorMode())
}
