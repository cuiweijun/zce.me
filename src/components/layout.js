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

import Header from './header'
import Footer from './footer'
import { useMetadata } from '../utils/hooks'

export default ({ title, description, image, location, children }) => {
  const site = useMetadata()

  const url = site.url + location.pathname

  const suffix = `${site.title} | ${site.slogan}`
  title = title ? `${title} - ${suffix}` : suffix

  description = description || site.description

  const img = image || site.cover
  image = img.startsWith('http') ? img : site.url + img

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

      <Header title={site.title} logo={site.logo} menus={site.menus} />

      <main className="site-main">{children}</main>

      <Footer author={site.author} />
    </Fragment>
  )
}
