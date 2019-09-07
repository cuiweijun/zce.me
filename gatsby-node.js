/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { kebabCase } = require('lodash')

const generatePermalink = (template, context) => {
  return template.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Permalink template does not support {${key}} Tag`)
  })
}

const createCollectionFields = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  const { relativePath } = getNode(node.parent)
  // load config from `content/site.yml`
  const { collections } = getNode('zce.me')
  const collection = collections[relativePath.split('/')[0]]
  if (!collection) return

  let {
    title,
    slug,
    date,
    updated,
    cover,
    description = '',
    template = collection.template,
    permalink = collection.permalink,
    draft = collection.draft,
    private = collection.private,
    featured = collection.featured,
    comment = collection.comment,
    authors = [],
    categories = [],
    tags = []
  } = node.frontmatter

  slug = slug || kebabCase(title)

  // cover = cover || path.relative(relativeDirectory, path.normalize('images/unknown.jpg'))
  // console.log(cover)

  date = new Date(date || null)
  updated = updated ? new Date(updated) : date

  authors.length || authors.push(...collection.authors)
  categories.length || categories.push(...collection.categories)
  tags.length || tags.push(...collection.tags)

  if (/{([a-z_]+)}/.test(permalink)) {
    // generate permalink if permalink not defined in frontmatter
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).substr(-2)
    const day = ('0' + date.getDate()).substr(-2)
    const author = getNode(authors[0]).slug
    const category = getNode(categories[0]).slug
    const tag = getNode(tags[0]).slug
    const context = { slug, year, month, day, author, category, tag }
    permalink = generatePermalink(permalink, context)
  }

  createNodeField({ node, name: 'type', value: collection.type })
  createNodeField({ node, name: 'template', value: template })
  createNodeField({ node, name: 'permalink', value: permalink })
  createNodeField({ node, name: 'draft', value: draft })
  createNodeField({ node, name: 'private', value: private })
  createNodeField({ node, name: 'featured', value: featured })
  createNodeField({ node, name: 'comment', value: comment })

  createNodeField({ node, name: 'title', value: title })
  createNodeField({ node, name: 'slug', value: slug })
  createNodeField({ node, name: 'date', value: date })
  createNodeField({ node, name: 'updated', value: updated })
  createNodeField({ node, name: 'cover', value: cover })
  createNodeField({ node, name: 'description', value: description })

  createNodeField({ node, name: 'authors', value: authors })
  createNodeField({ node, name: 'categories', value: categories })
  createNodeField({ node, name: 'tags', value: tags })
}

const createTaxonomyFields = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  const { name } = getNode(node.parent)
  // load config from `content/site.yml`
  const { taxonomies } = getNode('zce.me')
  const taxonomy = taxonomies[name]
  if (!taxonomy) return

  let {
    id,
    slug,
    template = taxonomy.template,
    permalink = taxonomy.permalink
  } = node

  slug = slug || kebabCase(id)

  if (/{([a-z_]+)}/.test(permalink)) {
    permalink = generatePermalink(permalink, { slug })
  }

  createNodeField({ node, name: 'type', value: taxonomy.type })
  createNodeField({ node, name: 'template', value: template })
  createNodeField({ node, name: 'permalink', value: permalink })
}

exports.onCreateNode = args => {
  switch (args.node.internal.type) {
    case 'MarkdownRemark':
      return createCollectionFields(args)
    case 'AuthorsYaml':
    case 'CategoriesYaml':
    case 'TagsYaml':
      return createTaxonomyFields(args)
  }
}

exports.createPages = async ({ graphql, getNode, actions, reporter }) => {
  // https://www.gatsbyjs.org/docs/creating-and-modifying-pages/
  const { createPage } = actions

  const result = await graphql(`
    query CreatePages {
      allMarkdownRemark(
        filter: { fields: { draft: { eq: false }, private: { eq: false } } }
        sort: { fields: fields___date, order: DESC }
      ) {
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
      allAuthorsYaml {
        nodes {
          id
          fields {
            type
            template
            permalink
          }
        }
      }
      allCategoriesYaml {
        nodes {
          id
          fields {
            type
            template
            permalink
          }
        }
      }
      allTagsYaml {
        nodes {
          id
          fields {
            type
            template
            permalink
          }
        }
      }
    }
  `)

  // errors report
  result.errors && reporter.panic(result.errors)

  // https://www.gatsbyjs.org/docs/adding-pagination/
  const { nodes: posts } = result.data.allMarkdownRemark

  // load config from `content/site.yml`
  const { collections } = getNode('zce.me')
  // Create pages based on different content types
  Object.values(collections)
    .map(c => c.type)
    .forEach(type => {
      const items = posts.filter(i => i.fields.type === type)
      items.forEach(({ id, fields }, i) => {
        const category = fields.categories[0].id
        const prev = i === items.length - 1 ? null : items[i + 1].id
        const next = i === 0 ? null : items[i - 1].id
        const template = `./src/templates/${fields.template}.js`
        createPage({
          path: fields.permalink,
          component: require.resolve(template),
          context: { id, category, prev, next }
        })
      })
    })

  // https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
  const { nodes: authors } = result.data.allAuthorsYaml
  const { nodes: categories } = result.data.allCategoriesYaml
  const { nodes: tags } = result.data.allTagsYaml
  const terms = [].concat(authors, categories, tags)

  // Create taxonomies pages
  terms.forEach(({ id, fields }) => {
    const template = `./src/templates/${fields.template}.js`
    createPage({
      path: fields.permalink,
      component: require.resolve(template),
      context: { id }
    })
  })
}
