/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// @ts-check

const { readFileSync } = require('fs')
const { basename } = require('path')
const { load } = require('js-yaml')
const { singular } = require('pluralize')
const { capitalize, kebabCase } = require('lodash')

/**
 * Content type options
 *
 * collection permalink tags:
 * - {slug} - the post slug, eg. my-post
 * - {year} - publication year, eg. 2019
 * - {month} - publication month, eg. 04
 * - {day} - publication day, eg. 29
 * - {author} - slug of first author, eg. cameron
 * - {category} - slug of first category, eg. tutorial
 * collection status:
 * - draft
 * - private
 * - published
 * - deprecated
 * - trashed
 * taxonomies permalink tags:
 * - {slug} - the taxonomy slug, eg. tom-jerry
 */
const options = {
  page: {
    template: 'page',
    permalink: '/{slug}/',
    // draft: false,
    // private: false,
    // featured: false,
    comment: false
    // authors: ['汪磊'],
    // categories: ['未分类'],
    // tags: []
  },
  post: {
    template: 'post',
    permalink: '/{year}/{month}/{slug}/'
    // draft: false,
    // private: false,
    // featured: false,
    // comment: true,
    // authors: ['汪磊'],
    // categories: ['未分类'],
    // tags: []
  },
  course: {
    template: 'course',
    permalink: '/courses/{slug}/'
    // draft: false,
    // private: false,
    // featured: false,
    // comment: true,
    // authors: ['汪磊'],
    // categories: ['未分类'],
    // tags: []
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

// for createMarkdownField (collection permalink)
const cache = new Map()

/**
 * Parse permalink template
 * @param {string} template
 * @param {{ [key: string]: string }} context
 */
const parsePermalink = (template, context) => {
  if (!/{([a-z_]+)}/.test(template)) return template

  return template.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Permalink template does not support {${key}} Tag`)
  })
}

/**
 * Create all yaml node
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
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

  // return if empty yaml
  if (!parsed) return

  const list = Array.isArray(parsed) ? parsed : [parsed]

  list.forEach((item, i) => {
    // ignore duplicated
    if (cache.has(`${type}-${item.name}`)) return

    const data = { ...options[type], ...item }

    // taxonomy defaults
    if (['author', 'category', 'tag'].includes(type)) {
      data.slug = data.slug || kebabCase(data.name)
      data.type = type
      data.template = data.template || data.type
      data.permalink = parsePermalink(data.permalink, data)

      cache.set(`${type}-${data.name}`, data.slug)
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

/**
 * Create all markdown field
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
const createMarkdownField = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createNodeField } = actions

  const file = getNode(node.parent)
  // @ts-ignore
  const pathItems = file.relativePath.split('/')
  const type = singular(pathItems[0])

  const fields = { type, ...options[type], ...node.frontmatter }

  // fallback values
  fields.slug = fields.slug || kebabCase(fields.title)
  fields.date = new Date(fields.date || file.birthtime)
  // fields.year = fields.date.getFullYear()
  fields.updated = new Date(fields.updated || file.mtime)
  // fields.cover = fields.cover || `${repeat('../', pathItems.length - 1)}images/default.png` // TODO: fallback cover
  fields.description = fields.description || ''
  fields.template = fields.template || fields.type
  fields.permalink = fields.permalink || '/{slug}/'
  fields.draft = fields.draft !== undefined ? fields.draft : false
  fields.private = fields.private !== undefined ? fields.private : false
  fields.featured = fields.featured !== undefined ? fields.featured : false
  fields.comment = fields.comment !== undefined ? fields.comment : true
  fields.sections = fields.sections || []
  fields.authors = fields.authors || ['汪磊'] // TODO: fallback author
  fields.categories = fields.categories || ['未分类'] // TODO: fallback category
  fields.tags = fields.tags || [] // TODO: fallback tag
  // TODO: if frontmatter taxonomy is empty
  // fields.authors.length || fields.authors.push(...defaults.authors)
  // fields.categories.length || fields.categories.push(...defaults.categories)
  // fields.tags.length || fields.tags.push(...defaults.tags)

  /** @param {string} type @param {string[]} taxonomies */
  const createMissingTaxonomy = (type, taxonomies) => {
    taxonomies.forEach((item, i) => {
      // ignore duplicated
      if (cache.has(`${type}-${item}`)) return

      const data = { ...options[type], name: item }

      data.slug = kebabCase(data.name)
      data.type = type
      data.template = data.template || data.type
      data.permalink = parsePermalink(data.permalink, data)

      cache.set(`${type}-${data.name}`, data.slug)

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
    author: cache.get(`author-${fields.authors[0]}`),
    category: cache.get(`category-${fields.categories[0]}`)
  })

  Object.keys(fields).forEach(name =>
    createNodeField({ node, name, value: fields[name] })
  )
}

/**
 * Gatsby onCreateNode hook
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = async args => {
  const { internal } = args.node
  if (internal.mediaType === 'text/yaml') {
    createYamlNode(args)
  }
  if (internal.type === 'MarkdownRemark') {
    createMarkdownField(args)
  }
}

/**
 * Gatsby createPages hook
 * @type {import('gatsby').GatsbyNode['createPages']}
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
              sections {
                duration
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
        // Why only provide ID parameter？
        // Let the page decide what data it needs
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

// https://www.gatsbyjs.org/docs/schema-customization/
/** @type {import('gatsby').GatsbyNode['createSchemaCustomization']} */
exports.createSchemaCustomization = async ({ actions }) => {
  const typeDefs = readFileSync('type-defs.gql', 'utf8')
  actions.createTypes(typeDefs)
}
