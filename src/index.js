/**
 * Implement Gatsby's Browser & SSR (Server Side Rendering) APIs in this file.
 *
 * See:
 * - https://www.gatsbyjs.org/docs/browser-apis/
 * - https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React, { useContext } from 'react'
import { ThemeProvider, ColorMode, css } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { Global } from '@emotion/core'
import normalize from 'emotion-normalize'
import Helmet from 'react-helmet'

import theme from './theme'
import Layout from './layout'

const query = graphql`
  query LayoutComponent {
    siteMetadata: config {
      url
      name
      title
      description
      slogan
      keywords
      author {
        name
      }
      language
    }
  }
`

const Head = ({ location }) => {
  const { siteMetadata } = useStaticQuery(query)
  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.language }}
      defaultTitle={`${siteMetadata.title} | ${siteMetadata.slogan}`}
      titleTemplate={`%s - ${siteMetadata.title} | ${siteMetadata.slogan}`}
      bodyAttributes={{ className: 'zce' }}
      meta={[
        { name: 'description', content: siteMetadata.description },
        { name: 'keywords', content: siteMetadata.keywords },
        { name: 'author', content: siteMetadata.author.name },
        { name: 'theme-color', content: theme.colors.background },
        // OpenGraph tags
        { name: 'og:site_name', content: siteMetadata.name },
        // TODO: website or article? http://ogp.me/#no_vertical
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: siteMetadata.title },
        { name: 'og:description', content: siteMetadata.description }
        // { name: 'og:image', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.src },
        // { name: 'og:image:width', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationWidth },
        // { name: 'og:image:height', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationHeight }
        // TODO: Twitter & Fackbook Card tags?
      ]}
      link={[{ rel: 'canonical', href: siteMetadata.url + location.pathname }]}
    />
  )
}

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
    <Head location={props.location} />
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
