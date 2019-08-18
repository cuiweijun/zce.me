# zce.me

> zce.me site source code.

## Getting Started

<!-- TODO -->

## Features

<!-- TODO -->

## Todos

- [x] Content pages
- [x] Mapping node types
- [x] Taxonomy pages
- [x] Meta tags
- [x] Gatsby image
- [x] Sitemap support
- [x] Post status
- [x] RSS Feed (not enabled)
- [x] Private & draft
- [x] Comments (disqus)
- [ ] Global style
- [ ] Netlify Deploy
- [ ] Netlify CMS
- [ ] write-good
- [ ] Local path & Remote url
- [ ] Cover with absolute url
- [ ] Create default nodes by programming
- [ ] Global State
- [ ] Category Hierarchy
- [ ] Gatsby Theme
- [ ] CSS-in-JS（Emotion + System UI Theme Spec + Theming)

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zce/zce.me)

## References

- https://www.bigeng.io/
- https://daveceddia.com/
- https://www.bricolage.io/
- https://github.com/kentcdodds/kentcdodds.com
- https://github.com/prichey/prestonrichey.com
- https://github.com/taniarascia/taniarascia.com
- https://github.com/fathomlondon/fath.om
- https://github.com/jlengstorf/marisamorby.com
- https://github.com/fabe/gatsby-universal
- https://github.com/LekoArts/gatsby-starter-prismic
- https://github.com/LekoArts/gatsby-starter-portfolio-cara
- https://github.com/scttcper/gatsby-casper
- https://github.com/niklasmtj/gatsby-starter-julia
- https://github.com/dvzrd/gatsby-sfiction
- https://github.com/Vagr9K/gatsby-advanced-starter
- https://github.com/greglobinski/gatsby-starter-personal-blog

- https://www.gatsbyjs.org/
- https://www.gatsbyjs.org/tutorial/
- https://www.gatsbyjs.org/docs/
- https://www.gatsbyjs.org/docs/custom-html/
- https://www.gatsbyjs.org/docs/emotion/
- https://www.gatsbyjs.org/docs/styled-components/
- https://www.gatsbyjs.org/docs/css-libraries-and-frameworks/
- https://github.com/KyleAMathews/typography.js
- https://github.com/GatsbyCentral/gatsby-awesome-pagination
- https://github.com/graysonhicks/gatsby-plugin-remote-images
- https://www.gatsbycentral.com/

- https://www.styleshout.com/
- https://webflow.com/

- https://system-ui.com/
- https://github.com/styled-system/styled-system
- https://github.com/primer/components

## Snippets

```js
// replacement
for (const key in context) {
  permalink = permalink.replace(`{${key}}`, context[key])
}
return permalink

// Create pages based on different taxonomies: authors, categories, tags
// https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
const getList = prop => {
  const allList = edges
    .map(e => e.node.fields[prop])
    .filter(c => c)
    .reduce((a, i) => a.concat(i), [])
  return [...new Set(allList)]
}
```

```js
// ignore markdown dirname or filename, use frontmatter slug instead
// const permalink = createFilePath({ node, getNode, basePath: 'posts' })
```

```js
const createDefaults = ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  if (node.internal.mediaType !== `text/yaml`) {
    return
  }
  const { createNode, createParentChildLink } = actions

  if (node.name === 'categories' && !node.children.includes('Uncategorized')) {
    const uncategorized = {
      id: 'Uncategorized',
      slug: 'uncategorized',
      description: '',
      cover: 'uncategorized.jpg',
      meta: {
        title: '',
        description: ''
      }
    }
    const uncategorizedNode = {
      ...uncategorized,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(uncategorized),
        type: 'CategoriesYaml'
      }
    }
    createNode(uncategorizedNode)
    createParentChildLink({ parent: node, child: uncategorizedNode })
    return
  }
}
```

```js
// echo node_modules/gatsby/dist/redux/actions/public.js:816
// node = trackInlineObjectsInRootNode(node, true);
```
