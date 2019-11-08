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

import Icon from './icon'
import { useNavState } from '../utils/hooks'

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
      cover {
        ...SiteCoverImage
      }
      navigation {
        text
        link
      }
      socials {
        name
        link
      }
      links {
        text
        link
      }
      subscription {
        name
        qrcode {
          ...QRCodeImage
        }
      }
    }

    allTag {
      nodes {
        name
        permalink
      }
    }
  }
`

const Layout = props => {
  const { siteMetadata, allTag } = useStaticQuery(query)

  // canonical url
  const url = siteMetadata.url + props.location.pathname

  // title
  const title = props.title
    ? `${props.title} - ${siteMetadata.name} | ${siteMetadata.slogan}`
    : `${siteMetadata.title} | ${siteMetadata.slogan}`

  // description
  const description = props.description || siteMetadata.description

  // keywords
  const keywords = props.keywords || siteMetadata.keywords

  // image
  const cover =
    props.cover === false ? false : props.cover || siteMetadata.cover

  const getDefaultHeader = () =>
    props.title ? (
      <div className="container">
        <h1>{props.title}</h1>
        {props.description && <p>{props.description}</p>}
      </div>
    ) : (
      <div className="container">
        <h1>{siteMetadata.name}</h1>
        <p>{siteMetadata.description}</p>
      </div>
    )

  // header
  const header =
    props.header === false ? false : props.header || getDefaultHeader()

  const navState = useNavState()

  return (
    <Fragment>
      <Helmet>
        <html lang={siteMetadata.language} />

        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={siteMetadata.author.name} />

        {/* OpenGraph tags */}
        <meta property="og:site_name" content={siteMetadata.name} />
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
        <nav className={`site-nav ${navState}`}>
          <div className="container">
            <Link className="nav-brand" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472 450">
                <defs>
                  <filter
                    id="shadow"
                    x="-12.7%"
                    y="-13.4%"
                    width="125.4%"
                    height="126.7%"
                    filterUnits="objectBoundingBox">
                    <feOffset in="SourceAlpha" result="offset-outer" />
                    <feGaussianBlur
                      stdDeviation="20"
                      in="offset-outer"
                      result="blue-outer"
                    />
                    <feComposite
                      in="blue-outer"
                      in2="SourceAlpha"
                      operator="out"
                      result="blue-outer"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                      in="blue-outer"
                    />
                  </filter>
                </defs>
                <mask id="mask" fill="#fff">
                  <path d="M472 114.26L203.029 335.74H407.1L472 449.48H64.9L0 335.74l268.971-221.48H64.9L0 .52h407.1z" />
                </mask>
                <g mask="url(#mask)" fill="#339AF0">
                  <path d="M0 0h472v449H0z" />
                </g>
                <g mask="url(#mask)">
                  <path
                    d="M0 335.74l64.9 113.74L472 114.26 407.1.52z"
                    filter="url(#shadow)"
                  />
                </g>
              </svg>
              <span>{siteMetadata.name}</span>
            </Link>
            <ul className="nav-menu">
              {siteMetadata.navigation.map(i => (
                <li key={i.link}>
                  <Link to={i.link}>{i.text}</Link>
                </li>
              ))}
            </ul>
            <form className="nav-search" action="/search/">
              <input
                type="search"
                placeholder="Search (not yet)"
                autoComplete="off"
              />
            </form>
          </div>
        </nav>

        {header && <div className="site-lead">{header}</div>}
      </header>

      <main className="site-main">{props.children}</main>

      <footer className="site-footer">
        <div className="container">
          <aside className="site-widget">
            <section className="site-widget-follow">
              <h4>Follow me</h4>
              <p>
                Get all the latest &amp; greatest posts delivered straight to
                your inbox.
              </p>
              <form
                name="subscribers"
                data-netlify="true"
                data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="subscribers" />
                <input
                  type="email"
                  name="email"
                  placeholder="Input your email"
                  autoComplete="off"
                  aria-label="Input your email"
                  aria-describedby="btn_send"
                />
                <button
                  className="btn"
                  id="btn_send"
                  title="Subscribe"
                  aria-label="Subscribe">
                  <Icon type="send" />
                </button>
              </form>
              <ul>
                {siteMetadata.socials.map(i => (
                  <li key={i.name}>
                    <a
                      className="btn"
                      href={i.link}
                      title={i.name}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon.Brand type={i.name.toLowerCase()} />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="btn"
                    href="https://feedly.com/i/subscription/feed/http://wedn.net:2368/rss/">
                    <Icon type="rss" />
                  </a>
                </li>
              </ul>
            </section>
            <section className="site-widget-tags">
              <h4>Tags</h4>
              <ul>
                {allTag.nodes.map(i => (
                  <li key={i.name}>
                    <Link to={i.permalink}>{i.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="site-widget-links">
              <h4>Links</h4>
              <ul>
                {siteMetadata.links.map(i => (
                  <li key={i.text}>
                    <Link to={i.link}>{i.text}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="site-widget-subscription">
              <h4>Subscription</h4>
              <Image
                fixed={siteMetadata.subscription.qrcode.childImageSharp.fixed}
                alt={siteMetadata.subscription.name}
                title={siteMetadata.subscription.name}
              />
            </section>
          </aside>

          <div className="site-info">
            <span>
              &copy; {new Date().getFullYear()}{' '}
              <a href={siteMetadata.url}>{siteMetadata.name}</a>. All Rights
              Reserved.
            </span>
            <ul>
              <li>
                <Link to="/privacy-policy/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service/">Terms of Service</Link>
              </li>
            </ul>
            <span>
              <a
                href="https://github.com/zce/zce.me"
                title="Visit the Source"
                target="_blank"
                rel="noopener noreferrer">
                &lt;/&gt;
              </a>{' '}
              with <i className="heart">♥</i> by{' '}
              <a
                href="https://zce.me"
                target="_blank"
                rel="noopener noreferrer">
                zce
              </a>
            </span>
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
  keywords: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired
}

export default Layout

export const GraphQLFragment = graphql`
  # Load layout cover image required data.
  fragment SiteCoverImage on File {
    childImageSharp {
      fluid(maxWidth: 1080, maxHeight: 720, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
        presentationWidth
        presentationHeight
      }
    }
  }

  # Load footer qrcode image required data.
  fragment QRCodeImage on File {
    childImageSharp {
      fixed(width: 128, height: 128) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
