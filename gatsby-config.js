/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// use content/_config.yml instead
// https://github.com/gatsbyjs/gatsby/issues/2968
exports.siteMetadata = {}

exports.plugins = [
  // plugin
  {
    resolve: 'gatsby-plugin-minify'
  },
  {
    resolve: 'gatsby-plugin-build'
  },
  {
    resolve: 'gatsby-plugin-theme'
  },
  {
    resolve: 'gatsby-plugin-react-helmet'
  },
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
      // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
      // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
      display: 'standalone',
      icon: 'static/icon.png', // This path is relative to the root of the site.
      // An optional attribute which provides support for CORS check.
      // If you do not provide a crossOrigin option, it will skip CORS for manifest.
      // Any invalid keyword or empty string defaults to 'anonymous'
      crossOrigin: 'use-credentials'
    }
  },
  {
    resolve: 'gatsby-plugin-offline'
  },
  {
    resolve: 'gatsby-plugin-sharp'
  },
  // source
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: 'content'
    }
  },
  // transformer
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
  {
    resolve: 'gatsby-transformer-sharp'
  }
]

exports.assetPrefix = ''
exports.pathPrefix = ''

exports.polyfill = false

exports.mapping = {
  'MarkdownRemark.fields.authors': 'Author.name',
  'MarkdownRemark.fields.categories': 'Category.name',
  'MarkdownRemark.fields.tags': 'Tag.name'
}

exports.proxy = null

exports.developMiddleware = null
