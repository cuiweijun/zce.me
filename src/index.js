/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { ThemeProvider, ColorMode, InitializeColorMode, css } from 'theme-ui'
import { Global } from '@emotion/core'

import { Wrapper } from './components'
import theme from './theme'
import styles from './styles'

// TODO: global context

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Global styles={css(styles)} />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

// TODO: theme-ui color mode & no flash
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<InitializeColorMode key="no-flash" />)
}
