const { load } = require('js-yaml')
const { singular } = require('pluralize')
const { upperFirst, camelCase, kebabCase } = require('lodash')

const cache = {}

const generatePermalink = (template, context) => {
  // /{([a-z_]+)}/.test(template)
  return template.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Permalink template does not support {${key}} Tag`)
  })
}

const createYamlNode = async (
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  options
) => {
  if (node.internal.mediaType !== 'text/yaml') return

  const defaults = options.taxonomies[node.name]
  const content = await loadNodeContent(node)
  const parsedContent = load(content)
  const list = Array.isArray(parsedContent) ? parsedContent : [parsedContent]

  list.forEach((item, i) => {
    const data = { ...defaults, ...item }

    // taxonomy defaults
    if (['authors', 'categories', 'tags'].includes(node.name)) {
      data.slug = data.slug || kebabCase(data.name)
      data.type = data.type || singular(node.name)
      data.template = data.template || data.type
      if (/{([a-z_]+)}/.test(data.permalink)) {
        data.permalink = generatePermalink(data.permalink, data)
      }

      // for collection permalink
      cache[`${data.type}-${data.name}`] = data.slug
    }

    actions.createNode({
      ...data,
      id: data.id || createNodeId(`${node.id} [${i}] >>> YAML`),
      parent: node.id,
      internal: {
        type: upperFirst(camelCase(singular(node.name))),
        contentDigest: createContentDigest(data)
      }
    })
  })
}

const createCollectionField = (
  { node, actions, getNode, getNodesByType, createNodeId, createContentDigest },
  options
) => {
  if (node.internal.type !== 'MarkdownRemark') return

  const { createNode, createNodeField } = actions

  const { relativePath } = getNode(node.parent)
  const dir = relativePath.split('/')[0]
  const defaults = options.collections[dir] || {}

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

  const createMissingTaxonomy = (name, taxonomies) => {
    const type = upperFirst(camelCase(singular(name)))
    const nodes = getNodesByType(type)
    const defaults = options.taxonomies[name]
    taxonomies
      .filter(item => nodes.every(n => n.name !== item))
      .forEach((item, i) => {
        const data = { ...defaults, name: item }
        data.slug = kebabCase(data.name)
        data.type = data.type || singular(name)
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
            type,
            contentDigest: createContentDigest(data)
          }
        })
      })
  }

  createMissingTaxonomy('authors', authors)
  createMissingTaxonomy('categories', categories)
  createMissingTaxonomy('tags', tags)

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

  createNodeField({ node, name: 'type', value: singular(dir) })
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

exports.onCreateNode = async (args, options) => {
  await createYamlNode(args, options)
  createCollectionField(args, options)
}
