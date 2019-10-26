/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { basename } = require('path')
const { load } = require('js-yaml')
const { singular } = require('pluralize')
const { capitalize, kebabCase } = require('lodash')

const options = {
  post: {
    template: 'post',
    permalink: '/{year}/{month}/{slug}/',
    draft: false,
    private: false,
    featured: false,
    comment: true,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: []
  },
  page: {
    template: 'page',
    permalink: '/{slug}/',
    draft: false,
    private: false,
    featured: false,
    comment: false,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: []
  },
  author: {
    template: 'author',
    permalink: '/authors/{slug}/'
  },
  category: {
    template: 'category',
    permalink: '/categories/{slug}/'
  },
  tag: {
    template: 'tag',
    permalink: '/tags/{slug}/'
  }
}

const cache = {}

const generatePermalink = (template, context) => {
  // /{([a-z_]+)}/.test(template)
  return template.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Permalink template does not support {${key}} Tag`)
  })
}

const createYamlNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  const type = singular(node.name === 'index' ? basename(node.dir) : node.name)

  const content = await loadNodeContent(node)
  const parsed = load(content)
  const list = Array.isArray(parsed) ? parsed : [parsed]

  const defaults = options[type]

  list.forEach((item, i) => {
    const data = { ...defaults, ...item }

    // taxonomy defaults
    if (['author', 'category', 'tag'].includes(type)) {
      data.slug = data.slug || kebabCase(data.name)
      data.type = data.type || type
      data.template = data.template || data.type
      if (/{([a-z_]+)}/.test(data.permalink)) {
        data.permalink = generatePermalink(data.permalink, data)
      }

      // for createCollectionField
      cache[`${data.type}-${data.name}`] = data.slug
    }

    actions.createNode({
      ...data,
      id: data.id || createNodeId(`${node.id} [${i}] >>> YAML`),
      parent: node.id,
      internal: {
        type: capitalize(type),
        contentDigest: createContentDigest(data)
      }
    })
  })
}

const createCollectionField = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createNodeField } = actions

  const { relativePath } = getNode(node.parent)
  const type = singular(relativePath.split('/')[0])

  const defaults = options[type] || {}

  let {
    title,
    slug = kebabCase(title),
    date,
    updated,
    cover,
    description = '',
    template = defaults.template,
    permalink = defaults.permalink,
    draft = defaults.draft,
    private = defaults.private,
    featured = defaults.featured,
    comment = defaults.comment,
    authors = [],
    categories = [],
    tags = []
  } = node.frontmatter

  // cover = cover || path.relative(relativeDirectory, path.normalize('images/unknown.jpg'))

  date = new Date(date || null)
  updated = updated ? new Date(updated) : date

  authors.length || authors.push(...defaults.authors)
  categories.length || categories.push(...defaults.categories)
  tags.length || tags.push(...defaults.tags)

  const createMissingTaxonomy = (type, taxonomies) => {
    taxonomies.forEach((item, i) => {
      if (cache[`${type}-${item}`]) return

      const data = Object.assign(options[type], { name: item })

      data.slug = kebabCase(data.name)
      data.type = data.type || type
      data.template = data.template || data.type

      if (/{([a-z_]+)}/.test(data.permalink)) {
        data.permalink = generatePermalink(data.permalink, data)
      }

      // for collection permalink
      cache[`${data.type}-${data.name}`] = data.slug

      createNode({
        ...data,
        id: createNodeId(`${node.id} [${i}] >>> YAML`),
        parent: node.id,
        internal: {
          type: capitalize(type),
          contentDigest: createContentDigest(data)
        }
      })
    })
  }

  createMissingTaxonomy('author', authors)
  createMissingTaxonomy('category', categories)
  createMissingTaxonomy('tag', tags)

  // parse permalink if permalink is template
  if (/{([a-z_]+)}/.test(permalink)) {
    permalink = generatePermalink(permalink, {
      slug,
      year: date.getFullYear(),
      month: ('0' + (date.getMonth() + 1)).substr(-2),
      day: ('0' + date.getDate()).substr(-2),
      author: cache[`author-${authors[0]}`],
      category: cache[`category-${categories[0]}`]
    })
  }

  createNodeField({ node, name: 'type', value: type })
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

exports.onCreateNode = async args => {
  const { internal } = args.node
  if (internal.mediaType === 'text/yaml') {
    await createYamlNode(args)
  }
  if (internal.type === 'MarkdownRemark') {
    await createCollectionField(args)
  }
}

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
