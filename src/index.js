import React, { useContext } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, ColorMode, css } from 'theme-ui'
import Helmet from 'react-helmet'

import theme from './theme'
import Layout from './layout'

const globalStyles = (
  <Global
    styles={css({
      '*': {
        boxSizing: 'border-box'
      },
      body: {
        margin: 0,
        fontSize: 'body',
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
        transition: 'background 0.3s, color 0.3s',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        WebkitTextSizeAdjust: '100%'
      }
    })}
  />
)

export const Context = React.createContext()
export const useRootContext = () => useContext(Context)

const Root = props => {
  const context = {}

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <ColorMode />
        {props.children}
      </ThemeProvider>
    </Context.Provider>
  )
}

const Page = props => (
  <>
    <Helmet>
      <title>zce.me</title>
    </Helmet>
    {globalStyles}
    <Layout>{props.children}</Layout>
  </>
)

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)
