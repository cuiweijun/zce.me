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
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from 'gatsby-image'

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

export default ({
  title,
  description,
  cover,
  bodyClass,
  location,
  children
}) => {
  const {
    site: { siteMetadata },
    siteCover
  } = useStaticQuery(query)

  const url = siteMetadata.url + location.pathname

  const suffix = `${siteMetadata.title} | ${siteMetadata.slogan}`
  title = title ? `${title} - ${suffix}` : suffix

  description = description || siteMetadata.description

  cover = cover || siteCover

  return (
    <Fragment>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="siteMetadata.author" content={siteMetadata.author} />
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
        {bodyClass && <body className={bodyClass} />}
      </Helmet>

      <header className="site-header">
        <nav className="site-nav">
          <div className="container">
            <Link className="nav-brand" to="/">
              <img
                alt={siteMetadata.title}
                src="/logo.svg"
                width="25"
                height="25"
              />
              <span>{siteMetadata.title}</span>
            </Link>
            <ul className="nav-menu">
              {siteMetadata.menus.map(i => (
                <li key={i.link}>
                  <Link to={i.link}>{i.text}</Link>
                </li>
              ))}
            </ul>
            <form className="nav-search" action="/search/">
              <input type="search" placeholder="Search" autoComplete="off" />
            </form>
          </div>
        </nav>
        <div className="site-heading">
          <h1>{siteMetadata.title}</h1>
          <p>{description}</p>
        </div>
        <Image className="site-cover" fluid={cover.childImageSharp.fluid} />
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p className="container">
          &copy; {new Date().getFullYear()} by {siteMetadata.author}, Built with{' '}
          <a
            href="https://gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Gatsby
          </a>
          . Visit the{' '}
          <a
            href="https://github.com/zce/zce.me"
            target="_blank"
            rel="noopener noreferrer">
            Source
          </a>
          .
        </p>
      </footer>
    </Fragment>
  )
}
