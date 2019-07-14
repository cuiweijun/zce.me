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
    template: 'post'
  },
  pages: {
    type: 'page',
    permalink: '/{slug}/',
    template: 'page'
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

const generatePermalink = (permalink, context) => {
  // // replacement
  // for (const key in context) {
  //   permalink = permalink.replace(`{${key}}`, context[key])
  // }
  // return permalink
  return permalink.replace(/{([a-z_]+)}/g, (_, prop) => {
    if (context.hasOwnProperty(prop)) return context[prop]
    throw new Error(`Permalink template does not support {${prop}} Tags`)
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
    permalink,
    comment = true,
    private = false,
    draft = false,
    authors = [],
    categories = [],
    tags = []
  } = node.frontmatter

  if (!slug) {
    slug = slugify(title, { lower: true })
  }

  date = new Date(date)
  updated = new Date(updated)

  // TODO: change default author
  authors.length || authors.push('Lei Wang')
  categories.length || categories.push('Uncategorized')
  tags.length || tags.push('Untagged')

  if (!permalink) {
    // generate permalink if permalink not defined in frontmatter
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).substr(-2)
    const day = ('0' + date.getDate()).substr(-2)
    const author = getNode(authors[0]).slug
    const category = getNode(categories[0]).slug
    const tag = getNode(tags[0]).slug
    const context = { slug, year, month, day, author, category, tag }
    permalink = generatePermalink(options.permalink, context)
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

  let { id, slug, template = options.template, permalink } = node

  if (!slug) {
    slug = slugify(id, { lower: true })
  }

  if (!permalink) {
    permalink = generatePermalink(options.permalink, { slug })
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

  const { edges: posts } = result.data.allMarkdownRemark

  // https://www.gatsbyjs.org/docs/adding-pagination/
  // Create pages based on different content types
  Object.values(collections)
    .map(c => c.type)
    .forEach(type => {
      const items = posts.filter(e => e.node.fields.type === type)
      items.forEach(({ node: { id, fields } }, i) => {
        const prev = i === items.length - 1 ? null : items[i + 1].node
        const next = i === 0 ? null : items[i - 1].node
        const template = `./src/templates/${fields.template}.js`
        createPage({
          path: fields.permalink,
          component: require.resolve(template),
          context: { id, prev, next }
        })
      })
    })

  // https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
  const { edges: authors } = result.data.allAuthorsYaml
  const { edges: categories } = result.data.allCategoriesYaml
  const { edges: tags } = result.data.allTagsYaml
  const meta = [].concat(authors, categories, tags)

  // Create taxonomies pages
  meta.forEach(item => {
    const { id, fields } = item.node
    const template = `./src/templates/${fields.template}.js`
    createPage({
      path: fields.permalink,
      component: require.resolve(template),
      context: { id }
    })
  })
}
