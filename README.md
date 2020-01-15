# zce.me

[![Netlify Status][netlify-image]][netlify-url]
[![Build Status][actions-image]][actions-url]
[![Code Style][style-image]][style-url]

> zce.me site source code, created with [Gatsby](https://www.gatsbyjs.org).

## Preview

- Nightly: https://nightly.zce.me
- Beta: https://beta.zce.me
- Stable: https://blog.zce.me

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

```text
└─ content ·································· all contents
   ├─ images ································ images
   │  └─ cover.jpg ·························· a image file
   ├─ pages ································· pages (content type)
   │  └─ about ······························ a page
   │     ├─ intro.mp4 ······················· attachments
   │     └─ index.md ························ content
   ├─ courses ······························· courses (content type)
   │  └─ 1970-01-01-javascript-essential ···· a course
   │     ├─ cover.png ······················· attachments
   │     └─ index.md ························ content
   ├─ posts ································· posts (content type)
   │  └─ 1970-01-01-hello-world ············· a post
   │     ├─ cover.png ······················· attachments
   │     ├─ img-01.jpg ······················ attachments
   │     ├─ img-02.jpg ······················ attachments
   │     └─ index.md ························ content
   ├─ authors.yml ··························· author collections
   ├─ categories.yml ························ category collections
   ├─ tags.yml ······························ tag collections
   ├─ links.yml ····························· link collections
   └─ _config.yml ··························· site metadata & config
```

## Features

<!-- TODO -->

## Todos

- [x] SEO
  - https://www.gatsbyjs.org/docs/seo/
- [x] Offline & Manifest
  - https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/
- [x] Progressive Web Apps (PWAs)
  - https://www.gatsbyjs.org/docs/progressive-web-app/
- [x] Performance
  - https://www.gatsbyjs.org/docs/performance/
  - https://webpagetest.org/
- [ ] Lighthouse CI
- [ ] Search
  - https://github.com/algolia/docsearch
  - https://www.gatsbyjs.org/docs/adding-search-with-algolia/
- [ ] Underline
  - https://github.com/TryGhost/Casper/blob/master/assets/css/screen.css#L399-L414
- [ ] Staticman
  - https://www.gatsbycentral.com/tutorial-comments-with-staticman-in-gatsby
- [ ] gatsby-plugin-catch-links
- [ ] gatsby-plugin-sitemap

### Backlog

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
- [x] Gatsby webpack output config
- [x] CSS-in-JS（Emotion + System UI Theme Spec + Theming)
- [x] Create default nodes by programming
- [ ] Content type filter
- [ ] authors & categories & tags page
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
- [ ] write-good
- [ ] Local path & Remote url
- [ ] Cover with absolute url
- [ ] Category Hierarchy
- [ ] Gatsby Theme
- [ ] Global State
- [ ] I18n

## Deploy

[![Deploy to Netlify][deploy-image]][deploy-url]

## Assets

```text
gitalk.css - custom build
gitalk.js - custom build
hls.js - v0.13.1 (hls.light.js)
plyr.js - v3.5.6 (custom locales)
plyr.css - v3.5.6 (custom color)
plyr.svg - v3.5.6
blank.mp4 - v3.5.6
zoom.js - v1.0.5
```

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me) &amp; [WEDN.NET](https://wedn.net)

[netlify-image]: https://api.netlify.com/api/v1/badges/cabdddaa-eb82-4780-b97e-fdf636c55314/deploy-status
[netlify-url]: https://app.netlify.com/sites/zce/deploys
[actions-image]: https://github.com/zce/zce.me/workflows/CI/badge.svg
[actions-url]: https://github.com/zce/zce.me/actions
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: https://standardjs.com
[deploy-image]: https://www.netlify.com/img/deploy/button.svg
[deploy-url]: https://app.netlify.com/start/deploy?repository=https://github.com/zce/zce.me
