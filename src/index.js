/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React, { useContext } from 'react'
import { ThemeProvider, css } from 'theme-ui'
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
      <Global styles={css(styles)} />
      {element}
    </ThemeProvider>
  </Context.Provider>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

// TODO: theme-ui color mode & no flash
// export const onRenderBody = ({ setPreBodyComponents }) => {
//   setPreBodyComponents(<InitializeColorMode key="no-flash" />)
// }

export const useRootContext = () => useContext(Context)
