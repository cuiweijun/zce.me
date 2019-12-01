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
  'gatsby-plugin-minify',
  'gatsby-plugin-no-sourcemaps',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-nprogress',
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
    resolve: 'gatsby-transformer-sharp',
    options: {}
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
