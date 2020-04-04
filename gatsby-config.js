/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const plugins = [
  'gatsby-plugin-minify',
  'gatsby-plugin-build',
  'gatsby-plugin-mourning',
  'gatsby-plugin-analytics',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-offline',
  'gatsby-plugin-sharp',
  'gatsby-plugin-theme',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: 'var(--c-primary, #339af0)'
    }
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: '汪磊的个人网站',
      short_name: 'Lei’s',
      start_url: '/',
      background_color: '#339af0',
      theme_color: '#339af0',
      display: 'standalone',
      icon: 'static/icon.png',
      crossOrigin: 'use-credentials'
    }
  }
]

const sources = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: 'content'
    }
  }
]

const transformers = [
  {
    // https://using-remark.gatsbyjs.org
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-remark-smartypants',
        'gatsby-remark-autolink-headers',
        'gatsby-remark-images',
        'gatsby-remark-prismjs',
        'gatsby-remark-responsive-iframe',
        'gatsby-remark-copy-linked-files'
      ]
    }
  },
  'gatsby-transformer-sharp'
]

// use content/_config.yml instead
// https://github.com/gatsbyjs/gatsby/issues/2968
exports.siteMetadata = {
  // for gatsby-plugin-sitemap (sync with content/_config.yml)
  siteUrl: 'https://blog.zce.me'
}

exports.plugins = [...plugins, ...sources, ...transformers]

exports.assetPrefix = ''

exports.pathPrefix = ''

exports.polyfill = false

exports.mapping = null

exports.proxy = null

exports.developMiddleware = null
