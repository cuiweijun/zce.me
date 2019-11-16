/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { basename } = require('path')
const { load } = require('js-yaml')
const { singular } = require('pluralize')
const { capitalize, kebabCase } = require('lodash')

// collection permalink tags:
// - {slug} - the post slug, eg. my-post
// - {year} - publication year, eg. 2019
// - {month} - publication month, eg. 04
// - {day} - publication day, eg. 29
// - {author} - slug of first author, eg. cameron
// - {category} - slug of first category, eg. tutorial
// collection status:
// - draft
// - private
// - published
// - deprecated
// - trashed
// taxonomies permalink tags:
// - {slug} - the taxonomy slug, eg. tom-jerry
const options = {
  page: {
    template: 'page',
    permalink: '/{slug}/',
    // draft: false,
    // private: false,
    // featured: false,
    comment: false,
    // authors: ['Lei Wang'],
    // categories: ['Uncategorized'],
    tags: []
  },
  post: {
    template: 'post',
    permalink: '/{year}/{month}/{slug}/',
    // draft: false,
    // private: false,
    // featured: false,
    // comment: true,
    // authors: ['Lei Wang'],
    // categories: ['Uncategorized'],
    tags: []
  },
  course: {
    template: 'course',
    permalink: '/courses/{slug}/',
    // draft: false,
    // private: false,
    // featured: false,
    // comment: true,
    // authors: ['Lei Wang'],
    // categories: ['Uncategorized'],
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

const parsePermalink = (template, context) => {
  if (!/{([a-z_]+)}/.test(template)) return template

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

  list.forEach((item, i) => {
    // ignore duplicated
    if (cache[`${type}-${item.name}`]) return

    const data = { ...options[type], ...item }

    // taxonomy defaults
    if (['author', 'category', 'tag'].includes(type)) {
      data.slug = data.slug || kebabCase(data.name)
      data.type = type
      data.template = data.template || data.type
      data.permalink = parsePermalink(data.permalink, data)

      // for createCollectionField
      cache[`${type}-${data.name}`] = data.slug
    }

    actions.createNode({
      ...data,
      id: data.id || createNodeId(`${node.id}-${i} >>> YAML`),
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

  const file = getNode(node.parent)
  const pathItems = file.relativePath.split('/')
  const type = singular(pathItems[0])

  const fields = { ...options[type], ...node.frontmatter }

  // fallback values
  fields.slug = fields.slug || kebabCase(fields.title)
  fields.date = new Date(fields.date || file.birthtime)
  fields.updated = new Date(fields.updated || file.mtime)
  // fields.cover = fields.cover || `${repeat('../', pathItems.length - 1)}images/default.png` // TODO: fallback cover
  fields.description = fields.description || ''
  fields.template = fields.template || type
  fields.permalink = fields.permalink || '/{slug}/'
  fields.draft = fields.draft !== undefined ? fields.draft : false
  fields.private = fields.private !== undefined ? fields.private : false
  fields.featured = fields.featured !== undefined ? fields.featured : false
  fields.comment = fields.comment !== undefined ? fields.comment : true
  fields.sections = fields.sections || []
  fields.authors = fields.authors || ['Lei Wang'] // TODO: fallback author
  fields.categories = fields.categories || ['Uncategorized'] // TODO: fallback category
  fields.tags = fields.tags || []
  // TODO: if frontmatter taxonomy is empty
  // fields.authors.length || fields.authors.push(...defaults.authors)
  // fields.categories.length || fields.categories.push(...defaults.categories)
  // fields.tags.length || fields.tags.push(...defaults.tags)

  const createMissingTaxonomy = (type, taxonomies) => {
    taxonomies.forEach((item, i) => {
      // ignore duplicated
      if (cache[`${type}-${item}`]) return

      const data = { ...options[type], name: item }

      data.slug = kebabCase(data.name)
      data.type = type
      data.template = data.template || data.type
      data.permalink = parsePermalink(data.permalink, data)

      // for collection permalink
      cache[`${type}-${data.name}`] = data.slug

      createNode({
        ...data,
        id: createNodeId(`${node.id}-${type}-${i} >>> YAML`),
        parent: node.id,
        internal: {
          type: capitalize(type),
          contentDigest: createContentDigest(data)
        }
      })
    })
  }

  createMissingTaxonomy('author', fields.authors)
  createMissingTaxonomy('category', fields.categories)
  createMissingTaxonomy('tag', fields.tags)

  fields.permalink = parsePermalink(fields.permalink, {
    slug: fields.slug,
    year: fields.date.getFullYear(),
    month: ('0' + (fields.date.getMonth() + 1)).substr(-2),
    day: ('0' + fields.date.getDate()).substr(-2),
    author: cache[`author-${fields.authors[0]}`],
    category: cache[`category-${fields.categories[0]}`]
  })

  createNodeField({ node, name: 'type', value: type })
  createNodeField({ node, name: 'template', value: fields.template })
  createNodeField({ node, name: 'permalink', value: fields.permalink })
  createNodeField({ node, name: 'draft', value: fields.draft })
  createNodeField({ node, name: 'private', value: fields.private })
  createNodeField({ node, name: 'featured', value: fields.featured })
  createNodeField({ node, name: 'comment', value: fields.comment })

  createNodeField({ node, name: 'title', value: fields.title })
  createNodeField({ node, name: 'slug', value: fields.slug })
  createNodeField({ node, name: 'date', value: fields.date })
  createNodeField({ node, name: 'updated', value: fields.updated })
  createNodeField({ node, name: 'cover', value: fields.cover })
  createNodeField({ node, name: 'description', value: fields.description })

  createNodeField({ node, name: 'sections', value: fields.sections })

  createNodeField({ node, name: 'authors', value: fields.authors })
  createNodeField({ node, name: 'categories', value: fields.categories })
  createNodeField({ node, name: 'tags', value: fields.tags })
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
              sections {
                title
              }
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

  // TODO: Archive pagination?
  // https://www.gatsbyjs.org/docs/adding-pagination/

  // Create collections page ===================================================

  const { group } = result.data.allMarkdownRemark

  group.forEach(({ nodes }) => {
    nodes.forEach(({ id, fields }, i) => {
      const cat = fields.categories[0].id
      const prev = i === nodes.length - 1 ? null : nodes[i + 1].id
      const next = i === 0 ? null : nodes[i - 1].id
      const template = `./src/templates/${fields.template}.js`
      createPage({
        path: fields.permalink,
        component: require.resolve(template),
        // 让页面自己决定需要什么数据
        context: { id, cat, prev, next }
      })

      // sub sections page
      if (fields.sections) {
        for (let i = 0; i < fields.sections.length; i++) {
          createPage({
            path: `${fields.permalink}${('0' + (i + 1)).substr(-2)}/`,
            component: require.resolve(template),
            context: { id, cat, prev, next, current: i }
          })
        }
      }
    })
  })

  // Create taxonomies page ====================================================

  const { nodes: authors } = result.data.allAuthor
  const { nodes: categories } = result.data.allCategory
  const { nodes: tags } = result.data.allTag
  const terms = [].concat(authors, categories, tags)

  terms.forEach(item => {
    const template = `./src/templates/${item.template}.js`
    createPage({
      path: item.permalink,
      component: require.resolve(template),
      context: { id: item.id }
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        // https://www.gatsbyjs.org/docs/debugging-html-builds/
        rules: [{ test: /plyr/, use: loaders.null() }]
      }
    })
  }

  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      // turn off source-maps
      devtool: false
    })
  }
}
