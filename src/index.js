/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React, { useContext } from 'react'
import { ThemeProvider, ColorMode, css } from 'theme-ui'
import { Global } from '@emotion/core'
import normalize from 'emotion-normalize'

import theme from './theme'
import Layout from './layout'

const Context = React.createContext()

// TODO: global context
const context = {}

const Root = props => (
  <Context.Provider value={context}>
    <ThemeProvider theme={theme}>
      <ColorMode />
      {props.children}
    </ThemeProvider>
  </Context.Provider>
)

const Page = props => (
  <>
    <Global styles={normalize} />
    <Global styles={css(theme.styles)} />
    <Layout {...props} />
  </>
)

export const useRootContext = () => useContext(Context)

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)
