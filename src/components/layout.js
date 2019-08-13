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
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from 'gatsby-image'

const query = graphql`
  query LayoutComponent {
    site {
      ...SiteMetadata
    }
    siteCover: file(relativePath: { eq: "images/cover.jpg" }) {
      ...SiteCoverImage
    }
  }
`

const Layout = props => {
  const {
    site: { siteMetadata },
    siteCover
  } = useStaticQuery(query)

  // canonical url
  const url = siteMetadata.url + props.location.pathname

  // title
  const suffix = `${siteMetadata.title} | ${siteMetadata.slogan}`
  const title = props.title ? `${props.title} - ${suffix}` : suffix

  // description
  const description = props.description || siteMetadata.description

  // image
  const cover = props.cover !== undefined ? props.cover : siteCover

  // heading
  const heading =
    props.heading !== undefined ? (
      props.heading
    ) : (
      <div className="container">
        <h1>{siteMetadata.title}</h1>
        <p>{siteMetadata.description}</p>
      </div>
    )

  return (
    <Fragment>
      <Helmet>
        <html lang={siteMetadata.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={siteMetadata.author} />
        {/* OpenGraph tags */}
        <meta property="og:site_name" content={siteMetadata.title} />
        {/* TODO: website or article? http://ogp.me/#no_vertical */}
        <meta property="og:type" content={`website`} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {cover && (
          <meta
            property="og:image"
            content={siteMetadata.url + cover.childImageSharp.fluid.src}
          />
        )}
        {cover && (
          <meta
            property="og:image:width"
            content={cover.childImageSharp.fluid.presentationWidth}
          />
        )}
        {cover && (
          <meta
            property="og:image:height"
            content={cover.childImageSharp.fluid.presentationHeight}
          />
        )}
        {/* TODO: Twitter & Fackbook Card tags? */}
        <link rel="canonical" href={url} />
        {props.bodyClass && <body className={props.bodyClass} />}
      </Helmet>

      {cover && (
        <Image className="site-cover" fluid={cover.childImageSharp.fluid} />
      )}

      <header className="site-header">
        <nav className="site-nav">
          <div className="container">
            <Link className="nav-brand" to="/">
              <img
                alt={siteMetadata.title}
                src={siteMetadata.logo}
                width="25"
                height="25"
              />
              <span>{siteMetadata.title}</span>
            </Link>
            <ul className="nav-menu">
              {siteMetadata.menus.map(i => (
                <li key={i.link}><Link to={i.link}>{i.text}</Link></li>
              ))}
            </ul>
            <form className="nav-search" action="/search/">
              <input type="search" placeholder="Search" autoComplete="off" />
            </form>
          </div>
        </nav>
        {heading && <div className="site-heading">{heading}</div>}
      </header>

      <main className="site-main">{props.children}</main>

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

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  bodyClass: PropTypes.string,
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  heading: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired
}

export default Layout
