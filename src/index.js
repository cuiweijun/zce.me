/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React, { useContext } from 'react'
import { ThemeProvider, ColorMode, css } from 'theme-ui'
import { Global } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
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
      # cover {
      #   childImageSharp {
      #     fluid(maxWidth: 1080, maxHeight: 720, cropFocus: CENTER) {
      #       ...GatsbyImageSharpFluid
      #       presentationWidth
      #       presentationHeight
      #     }
      #   }
      # }
    }
  }
`

// const globalStyles = (
//   <Global
//     styles={css({
//       '*': {
//         boxSizing: 'border-box'
//       },
//       body: {
//         margin: 0,
//         fontSize: 'body',
//         fontFamily: 'body',
//         fontWeight: 'body',
//         lineHeight: 'body',
//         transition: 'background 0.3s, color 0.3s',
//         textRendering: 'optimizeLegibility',
//         WebkitFontSmoothing: 'antialiased',
//         MozOsxFontSmoothing: 'grayscale',
//         WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
//         WebkitTextSizeAdjust: '100%'
//       }
//     })}
//   />
// )

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

const Page = props => {
  const { siteMetadata } = useStaticQuery(query)

  return (
    <>
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
        link={[
          { rel: 'canonical', href: siteMetadata.url + props.location.pathname }
        ]}
      />
      {/* {globalStyles} */}
      <Global styles={css(theme.styles)} />
      <Layout {...props} />
    </>
  )
}

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
)
