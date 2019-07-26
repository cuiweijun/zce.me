/**
 * Layout component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See:
 * - https://www.gatsbyjs.org/docs/use-static-query/
 * - https://www.gatsbyjs.org/docs/add-seo-component/
 * - https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
 */

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import Header from './header'
import Footer from './footer'

const query = graphql`
  query LayoutComponent {
    site {
      siteMetadata {
        url
        title
        slogan
        description
        keywords
        author
        language
        menus {
          text
          link
        }
      }
    }
    siteCover: file(relativePath: { eq: "images/cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1080, maxHeight: 720) {
          ...GatsbyImageSharpFluid
          presentationWidth
          presentationHeight
        }
      }
    }
  }
`

export default ({ title, description, cover, location, children }) => {
  const {
    site: { siteMetadata },
    siteCover
  } = useStaticQuery(query)

  const url = siteMetadata.url + location.pathname

  const suffix = `${siteMetadata.title} | ${siteMetadata.slogan}`
  title = title ? `${title} - ${suffix}` : suffix

  description = description || siteMetadata.description

  cover = cover || siteCover

  console.log(cover.childImageSharp.fluid)

  return (
    <Fragment>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={siteMetadata.author} />
        {/* OpenGraph tags */}
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={siteMetadata.url + cover.childImageSharp.fluid.src}
        />
        <meta
          property="og:image:width"
          content={cover.childImageSharp.fluid.presentationWidth}
        />
        <meta
          property="og:image:height"
          content={cover.childImageSharp.fluid.presentationHeight}
        />
        {/* TODO: website or article? http://ogp.me/#no_vertical */}
        <meta property="og:type" content={`website`} />
        {/* TODO: Twitter & Fackbook Card tags? */}
        <link rel="canonical" href={url} />
      </Helmet>

      <Header
        title={siteMetadata.title}
        menus={siteMetadata.menus}
        cover={cover}>
        <h1>{siteMetadata.title}</h1>
        <p>{description}</p>
      </Header>

      <main className="site-main">{children}</main>

      <Footer author={siteMetadata.author} />
    </Fragment>
  )
}
