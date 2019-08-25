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
  const cover = props.cover === false ? false : props.cover || siteCover

  const getDefaultHeader = () =>
    props.title ? (
      <div className="container">
        <h1>{props.title}</h1>
        {props.description && <p>{props.description}</p>}
      </div>
    ) : (
      <div className="container">
        <h1>{siteMetadata.title}</h1>
        <p>{siteMetadata.description}</p>
      </div>
    )

  // header
  const header =
    props.header === false ? false : props.header || getDefaultHeader()

  // const [scrolled, setScrolled] = useState(false)

  // useLayoutEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 20) {
  //       scrolled || setScrolled(true)
  //     } else {
  //       scrolled && setScrolled(false)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // })

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

        {props.className && <body className={props.className} />}
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

        {header && <div className="site-lead">{header}</div>}
      </header>

      <main className="site-main">{props.children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-widget">
            <p align="center">TODO: footer widgets</p>
          </div>

          <div className="site-info">
            <span>&copy; {new Date().getFullYear()} <a href={siteMetadata.url}>{siteMetadata.title}</a>. All Rights Reserved.</span>
            <ul>
              <li><Link to="/privacy-policy/">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service/">Terms of Service</Link></li>
            </ul>
            <span><a href="https://github.com/zce/zce.me" title="Visit the Source" target="_blank" rel="noopener noreferrer">&lt;/&gt;</a> with <i className="heart">♥</i> by <a href="https://zce.me">zce</a></span>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

Layout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired
}

export default Layout
