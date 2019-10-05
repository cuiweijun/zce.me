/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// exports.createPages = async ({ graphql, getNode, actions, reporter }) => {
//   // https://www.gatsbyjs.org/docs/creating-and-modifying-pages/
//   const { createPage } = actions

//   const result = await graphql(`
//     query CreatePages {
//       allMarkdownRemark(
//         filter: { fields: { draft: { eq: false }, private: { eq: false } } }
//         sort: { fields: fields___date, order: DESC }
//       ) {
//         nodes {
//           id
//           fields {
//             type
//             template
//             permalink
//             categories {
//               id
//             }
//           }
//         }
//       }
//       allAuthorsYaml {
//         nodes {
//           id
//           fields {
//             type
//             template
//             permalink
//           }
//         }
//       }
//       allCategoriesYaml {
//         nodes {
//           id
//           fields {
//             type
//             template
//             permalink
//           }
//         }
//       }
//       allTagsYaml {
//         nodes {
//           id
//           fields {
//             type
//             template
//             permalink
//           }
//         }
//       }
//     }
//   `)

//   // errors report
//   result.errors && reporter.panic(result.errors)

//   // https://www.gatsbyjs.org/docs/adding-pagination/
//   const { nodes: posts } = result.data.allMarkdownRemark

//   // load config from `content/site.yml`
//   const { collections } = getNode('zce.me')
//   // Create pages based on different content types
//   Object.values(collections)
//     .map(c => c.type)
//     .forEach(type => {
//       const items = posts.filter(i => i.fields.type === type)
//       items.forEach(({ id, fields }, i) => {
//         const category = fields.categories[0].id
//         const prev = i === items.length - 1 ? null : items[i + 1].id
//         const next = i === 0 ? null : items[i - 1].id
//         const template = `./src/templates/${fields.template}.js`
//         createPage({
//           path: fields.permalink,
//           component: require.resolve(template),
//           context: { id, category, prev, next }
//         })
//       })
//     })

//   // https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
//   const { nodes: authors } = result.data.allAuthorsYaml
//   const { nodes: categories } = result.data.allCategoriesYaml
//   const { nodes: tags } = result.data.allTagsYaml
//   const terms = [].concat(authors, categories, tags)

//   // Create taxonomies pages
//   terms.forEach(({ id, fields }) => {
//     const template = `./src/templates/${fields.template}.js`
//     createPage({
//       path: fields.permalink,
//       component: require.resolve(template),
//       context: { id }
//     })
//   })
// }
