/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const slugify = require('slugify')

/**
 * collections permalink tags:
 * - {slug} - the post slug, eg. my-post
 * - {year} - publication year, eg. 2019
 * - {month} - publication month, eg. 04
 * - {day} - publication day, eg. 29
 * - {author} - slug of first author, eg. cameron
 * - {category} - slug of first category, eg. tutorial
 * - {tag} - slug of first tag listed in the post, eg. news
 */
const collections = {
  posts: {
    type: 'post',
    permalink: '/{year}/{month}/{slug}/',
    template: 'post',
    comment: true,
    private: false,
    draft: false,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: ['Untagged']
  },
  pages: {
    type: 'page',
    permalink: '/{slug}/',
    template: 'page',
    comment: true,
    private: false,
    draft: false,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: ['Untagged']
  }
}

/**
 * taxonomies permalink tags:
 * - {slug} - the taxonomy slug, eg. tom-jerry
 */
const taxonomies = {
  authors: {
    type: 'author',
    permalink: '/authors/{slug}/',
    template: 'author'
  },
  categories: {
    type: 'category',
    permalink: '/categories/{slug}/',
    template: 'category'
  },
  tags: {
    type: 'tag',
    permalink: '/tags/{slug}/',
    template: 'tag'
  }
}

const generatePermalink = (template, context) => {
  return template.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Permalink template does not support {${key}} Tag`)
  })
}

const createMarkdownFields = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  const { relativeDirectory } = getNode(node.parent)
  const options = collections[path.dirname(relativeDirectory)]
  if (!options) return

  let {
    title,
    slug,
    cover,
    description,
    date,
    updated,
    template = options.template,
    permalink = options.permalink,
    comment = options.comment,
    private = options.private,
    draft = options.draft,
    authors = [],
    categories = [],
    tags = []
  } = node.frontmatter

  if (!slug) {
    slug = slugify(title, { lower: true })
  }

  date = new Date(date || null)
  updated = updated ? new Date(updated) : date

  authors.length || authors.push(...options.authors)
  categories.length || categories.push(...options.categories)
  tags.length || tags.push(...options.tags)

  if (/{([a-z_]+)}/.test(permalink)) {
    // generate permalink if permalink not defined in frontmatter
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).substr(-2)
    const day = ('0' + date.getDate()).substr(-2)
    const author = authors.length ? getNode(authors[0]).slug : 'ghost'
    const category = categories.length ? getNode(categories[0]).slug : 'uncategorized'
    const tag = tags.length ? getNode(tags[0]).slug : 'untagged'
    const context = { slug, year, month, day, author, category, tag }
    permalink = generatePermalink(permalink, context)
  }

  createNodeField({ node, name: 'title', value: title })
  createNodeField({ node, name: 'slug', value: slug })
  createNodeField({ node, name: 'cover', value: cover })
  createNodeField({ node, name: 'description', value: description })
  createNodeField({ node, name: 'date', value: date })
  createNodeField({ node, name: 'updated', value: updated })

  createNodeField({ node, name: 'type', value: options.type })
  createNodeField({ node, name: 'template', value: template })
  createNodeField({ node, name: 'permalink', value: permalink })
  createNodeField({ node, name: 'comment', value: comment })
  createNodeField({ node, name: 'private', value: private })
  createNodeField({ node, name: 'draft', value: draft })

  createNodeField({ node, name: 'authors', value: authors })
  createNodeField({ node, name: 'categories', value: categories })
  createNodeField({ node, name: 'tags', value: tags })
}

const createYamlFields = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  const { base, ext } = getNode(node.parent)
  const options = taxonomies[path.basename(base, ext)]
  if (!options) return

  let {
    id,
    slug,
    template = options.template,
    permalink = options.permalink
  } = node

  if (!slug) {
    slug = slugify(id, { lower: true })
  }

  if (/{([a-z_]+)}/.test(permalink)) {
    permalink = generatePermalink(permalink, { slug })
  }

  createNodeField({ node, name: 'type', value: options.type })
  createNodeField({ node, name: 'template', value: template })
  createNodeField({ node, name: 'permalink', value: permalink })
}

exports.onCreateNode = args => {
  switch (args.node.internal.type) {
    case 'MarkdownRemark':
      return createMarkdownFields(args)
    case 'AuthorsYaml':
    case 'CategoriesYaml':
    case 'TagsYaml':
      return createYamlFields(args)
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // https://www.gatsbyjs.org/docs/creating-and-modifying-pages/
  const { createPage } = actions

  const result = await graphql(`
    query CreatePages {
      allMarkdownRemark(sort: { fields: fields___date, order: DESC }) {
        edges {
          node {
            id
            fields {
              title
              slug
              date
              type
              template
              permalink
            }
          }
        }
      }
      allAuthorsYaml {
        edges {
          node {
            id
            fields {
              type
              template
              permalink
            }
          }
        }
      }
      allCategoriesYaml {
        edges {
          node {
            id
            fields {
              type
              template
              permalink
            }
          }
        }
      }
      allTagsYaml {
        edges {
          node {
            id
            fields {
              type
              template
              permalink
            }
          }
        }
      }
    }
  `)

  // errors report
  result.errors && reporter.panic(result.errors)

  // https://www.gatsbyjs.org/docs/adding-pagination/
  const { edges: posts } = result.data.allMarkdownRemark

  // Create pages based on different content types
  Object.values(collections)
    .map(c => c.type)
    .forEach(type => {
      const items = posts.filter(e => e.node.fields.type === type)
      items.forEach(({ node: { id, fields } }, i) => {
        const slug = fields.slug
        const prev = i === items.length - 1 ? null : items[i + 1].node
        const next = i === 0 ? null : items[i - 1].node
        const template = `./src/templates/${fields.template}.js`
        createPage({
          path: fields.permalink,
          component: require.resolve(template),
          context: { id, slug, prev, next }
        })
      })
    })

  // https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
  const { edges: authors } = result.data.allAuthorsYaml
  const { edges: categories } = result.data.allCategoriesYaml
  const { edges: tags } = result.data.allTagsYaml
  const terms = [].concat(authors, categories, tags)

  // Create taxonomies pages
  terms.forEach(item => {
    const { id, fields } = item.node
    const template = `./src/templates/${fields.template}.js`
    createPage({
      path: fields.permalink,
      component: require.resolve(template),
      context: { id }
    })
  })
}
