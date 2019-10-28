# zce.me [![Netlify Status][netlify-image]][netlify-url]

[![Build Status][travis-image]][travis-url]
[![Code Style][style-image]][style-url]

> zce.me site source code, created by [Gatsby](https://www.gatsbyjs.org).

## Getting Started

```shell
# clone repo
$ git clone https://github.com/zce/zce.me.git
$ cd zce.me
# install dependencies
$ yarn # or npm install
```

### Available Scripts

```shell
# serve with hot reload at http://localhost:8000
$ yarn dev

# format the source files.
$ yarn format

# build for production with minification
$ yarn build
```

## Concepts

- Content Type
  - post
  - page
  - course
- Taxonomy Type
  - author
  - category
  - tag

### Content

`content` is the content catalogue of the website. All the content you create should be stored here. You can divide subdirectories by content type.

The default structure is shown below:

```
└─ content ·································· content dir
   ├─ images ································ content dir
   │  └─ cover.jpg ·························· content dir
   ├─ meta ·································· metadata dir
   │  ├─ authors.yml ························ author collections
   │  ├─ categories.yml ····················· category collections
   │  ├─ tags.yml ··························· tag collections
   │  └─ site.yml ··························· site metadata & config
   ├─ pages ································· pages dir
   │  ├─ about ······························ page dir
   │  │  └─ index.md ························ page markdown
   │  └─ contact ···························· page dir
   │     └─ index.md ························ page markdown
   ├─ posts ································· posts dir
   │  ├─ 1992-02-25-hello-world ············· post item dir
   │  │  └─ index.md ························ post markdown
   │  └─ 2000-01-01-placeholder ············· post item dir
   │     ├─ media ··························· post relevant
   │     │  ├─ cover.png ···················· relevant file
   │     │  ├─ img-01.jpg ··················· relevant file
   │     │  └─ img-02.jpg ··················· relevant file
   │     └─ index.md ························ post markdown
   └─ README.md ····························· this file
```

## Features

<!-- TODO -->

## Todos

- [x] Content pages
- [x] Mapping node types
- [x] Taxonomy pages
- [x] Meta tags
- [x] Gatsby image
- [x] Post status
- [x] Private & Draft
- [x] Comments (Disqus)
- [x] Global styles
- [x] Netlify Deploy
- [x] Navigation style
- [x] Site Footer
- [x] Husky + Lint-staged
- [x] Netlify Forms
- [ ] Manifest
- [ ] Sitemap support
- [ ] RSS feed
- [ ] Comment System (Custom service)
  - https://www.taniarascia.com/add-comments-to-static-site/
- [ ] Authentication
  - https://www.gatsbyjs.org/tutorial/authentication-tutorial/
  - https://www.gatsbyjs.org/blog/2019-03-21-add-auth0-to-gatsby-livestream/
  - https://auth0.com/blog/securing-gatsby-with-auth0/
  - https://github.com/auth0-blog/gatsby-auth0
  - https://github.com/gatsbyjs/gatsby/issues/1100
  - https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/
  - https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
- [ ] Netlify CMS
  - https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/
  - https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cms/
  - https://github.com/netlify-templates/gatsby-starter-netlify-cms
- [ ] Offline support
- [ ] authors & categories & tags page
- [ ] Search
  - [ ] https://www.gatsbyjs.org/docs/adding-search-with-algolia/
- [ ] write-good
- [ ] Gatsby webpack output config
- [ ] Local path & Remote url
- [ ] Cover with absolute url
- [ ] Category Hierarchy
- [ ] Gatsby Theme
- [ ] CSS-in-JS（Emotion + System UI Theme Spec + Theming)
- [ ] Create default nodes by programming
- [ ] Global State

## Deploy

[![Deploy to Netlify][deploy-image]][deploy-url]

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me) &amp; [WEDN.NET](https://wedn.net)

[netlify-image]: https://api.netlify.com/api/v1/badges/cabdddaa-eb82-4780-b97e-fdf636c55314/deploy-status
[netlify-url]: https://app.netlify.com/sites/zce/deploys
[travis-image]: https://travis-ci.com/zce/zce.me.svg?token=A6sqUmycHXeAV8G2sDiW&branch=master
[travis-url]: https://travis-ci.com/zce/zce.me
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com
[deploy-image]: https://www.netlify.com/img/deploy/button.svg
[deploy-url]: https://app.netlify.com/start/deploy?repository=https://github.com/zce/zce.me
