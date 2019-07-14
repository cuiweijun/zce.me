/**
 * https://www.gatsbyjs.org/docs/remark-plugin-tutorial/
 */
module.exports = ({ markdownNode }, pluginOptions) => {
  console.log(markdownNode)
  // // Manipulate Node
  // if (!(markdownNode.frontmatter.categories && markdownNode.frontmatter.categories.length)) {
  //   markdownNode.frontmatter.categories = ['Uncategorized']
  // }
  // if (!(markdownNode.frontmatter.tags && markdownNode.frontmatter.tags.length)) {
  //   markdownNode.frontmatter.tags = ['Untagged']
  // }
  // if (!(markdownNode.frontmatter.authors && markdownNode.frontmatter.authors.length)) {
  //   markdownNode.frontmatter.authors = ['Gatsby']
  // }
}

module.exports.mutateSource = ({ markdownNode }, pluginOptions) => {
  console.log(11111)
  if (!(markdownNode.frontmatter.authors && markdownNode.frontmatter.authors.length)) {
    markdownNode.frontmatter.authors = ['Gatsby']
  }
}

// files,
// markdownNode,
// markdownAST,
// pathPrefix,
// getNode,
// reporter,
// cache,
// createContentDigest,

/**
 * markdownAST
 * markdownNode
 * files
 * pathPrefix
 * reporter
 * cache
 * traceId
 * parentSpan
 * basePath
 * actions
 * store
 * emitter
 * tracing
 * schema
 */
