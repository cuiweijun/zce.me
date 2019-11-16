/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React, { useContext } from 'react'
import { ThemeProvider, ColorMode, InitializeColorMode, css } from 'theme-ui'
import { Global } from '@emotion/core'

import { Wrapper } from './components'
import theme from './theme'
import styles from './styles'

const Context = React.createContext()

// TODO: global context
const context = {}

export const wrapRootElement = ({ element }) => (
  <Context.Provider value={context}>
    <ThemeProvider theme={theme}>
      <ColorMode />
      {element}
    </ThemeProvider>
  </Context.Provider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>
    <Global styles={css(styles)} />
    <Global styles={css(theme.styles)} />
    {element}
  </Wrapper>
)

export const onRenderBody = ({ setPreBodyComponents }) => {
  // theme-ui no flash
  setPreBodyComponents(<InitializeColorMode />)
}

export const useRootContext = () => useContext(Context)
