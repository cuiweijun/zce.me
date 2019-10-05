/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query CreatePages {
      allMarkdownRemark(
        filter: { fields: { draft: { eq: false }, private: { eq: false } } }
        sort: { fields: fields___date, order: DESC }
      ) {
        group(field: fields___type) {
          fieldValue
          nodes {
            id
            fields {
              type
              template
              permalink
              categories {
                id
              }
            }
          }
        }
      }
      allAuthor {
        nodes {
          id
          type
          template
          permalink
        }
      }
      allCategory {
        nodes {
          id
          type
          template
          permalink
        }
      }
      allTag {
        nodes {
          id
          type
          template
          permalink
        }
      }
    }
  `)

  // errors report
  result.errors && reporter.panic(result.errors)

  // TODO: https://www.gatsbyjs.org/docs/adding-pagination/
  const { group } = result.data.allMarkdownRemark

  group.forEach(item => {
    item.nodes.forEach(({ id, fields }, i) => {
      const category = fields.categories[0].id
      const prev = i === item.nodes.length - 1 ? null : item.nodes[i + 1].id
      const next = i === 0 ? null : item.nodes[i - 1].id
      const template = `./src/templates/${fields.template}.js`
      createPage({
        path: fields.permalink,
        component: require.resolve(template),
        context: { id, category, prev, next }
      })
    })
  })

  const { nodes: authors } = result.data.allAuthor
  const { nodes: categories } = result.data.allCategory
  const { nodes: tags } = result.data.allTag
  const terms = [].concat(authors, categories, tags)

  // Create taxonomies pages
  terms.forEach(item => {
    const template = `./src/templates/${item.template}.js`
    createPage({
      path: item.permalink,
      component: require.resolve(template),
      context: { id: item.id }
    })
  })
}
