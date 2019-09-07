/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const _ = require(`lodash`)

// use content/site.yml instead
// exports.siteMetadata = {}

exports.plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: 'content'
    }
  },
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
    resolve: 'gatsby-transformer-yaml',
    options: {
      typeName: ({ node }) => _.upperFirst(_.camelCase(`${node.name} Yaml`))
    }
  },
  'gatsby-transformer-sharp',
  // 'gatsby-plugin-sharp', // TODO: no need?
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-nprogress',
  'gatsby-plugin-sass',
  // 'gatsby-plugin-feed',
  // 'gatsby-plugin-sitemap',
  'gatsby-plugin-offline'
]

// https://www.gatsbyjs.org/docs/path-prefix/
exports.pathPrefix = '/'

// https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
exports.mapping = {
  'MarkdownRemark.fields.authors': 'AuthorsYaml',
  'MarkdownRemark.fields.categories': 'CategoriesYaml',
  'MarkdownRemark.fields.tags': 'TagsYaml'
}
