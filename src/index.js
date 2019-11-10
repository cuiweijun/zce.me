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
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

import theme from './theme'

const Context = React.createContext()

// TODO: global context
const context = {}

const Head = ({ location: { pathname } }) => {
  const { config } = useStaticQuery(
    graphql`
      {
        config {
          url
        }
      }
    `
  )
  const link = [{ rel: 'canonical', href: config.url + pathname }]
  return <Helmet link={link} />
}

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
    <Head location={props.location} />
    <Global styles={normalize} />
    <Global styles={css(theme.styles)} />
    {props.children}
  </>
)

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)

export const useRootContext = () => useContext(Context)
