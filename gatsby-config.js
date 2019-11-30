/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// use content/meta/_site.yml instead
// https://github.com/gatsbyjs/gatsby/issues/2968
exports.siteMetadata = {}

exports.plugins = [
  // plugin
  'gatsby-plugin-minify',
  'gatsby-plugin-no-sourcemaps',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-nprogress',
  // 'gatsby-plugin-sharp', // TODO: no need?
  // 'gatsby-plugin-feed',
  // 'gatsby-plugin-sitemap',
  // {
  //   resolve: `gatsby-plugin-netlify`,
  //   options: {
  //     headers: {
  //       '/*.js': ['cache-control: public, max-age=31536000, immutable'],
  //       '/*.css': ['cache-control: public, max-age=31536000, immutable'],
  //       '/sw.js': ['cache-control: public, max-age=0, must-revalidate'],
  //     },
  //   },
  // },
  // {
  //   resolve: 'gatsby-plugin-manifest',
  //   options: {
  //     name: 'Lei’s',
  //     short_name: 'Lei’s Personal Website',
  //     start_url: '/',
  //     display: 'standalone',
  //     background_color: '#f7f0eb',
  //     theme_color: '#f4f8fb',
  //     icon: 'content/images/icon.png'
  //   }
  // },
  // 'gatsby-plugin-offline',
  // 'gatsby-plugin-remove-trailing-slashes', // ?
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
exports.pathPrefix = '/'

exports.polyfill = false

exports.mapping = {
  'MarkdownRemark.fields.authors': 'Author.name',
  'MarkdownRemark.fields.categories': 'Category.name',
  'MarkdownRemark.fields.tags': 'Tag.name'
}

exports.proxy = null

exports.developMiddleware = null
