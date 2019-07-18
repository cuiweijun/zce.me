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
import { Link } from 'gatsby'

import { useMetadata } from '../utils/hooks'

export default ({ title, description, image, location, children }) => {
  const site = useMetadata()

  const url = site.url + location.pathname

  const suffix = `${site.title} | ${site.slogan}`
  title = title ? `${title} - ${suffix}` : suffix

  description = description || site.description

  const img = image || site.cover
  image = img.startsWith('http') ? img : site.url + img

  const year = new Date().getFullYear()

  return (
    <Fragment>
      <Helmet>
        <html lang={site.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={site.author} />
        {/* OpenGraph tags */}
        <meta property="og:site_name" content={site.title} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/* TODO: website or article? http://ogp.me/#no_vertical */}
        <meta property="og:type" content={`website`} />
        {/* TODO: Twitter & Fackbook Card tags? */}
        <link rel="canonical" href={url} />
      </Helmet>

      <header className="site-header">
        <nav className="site-nav">
          <Link className="site-brand" to="/">
            {site.title}
          </Link>
          <ul className="site-menu">
            {site.menus.map(i => (
              <li key={i.link}>
                <Link to={i.link}>{i.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>
          &copy; {year} by {site.author}, Built with{' '}
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
