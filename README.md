# zce.me ![CI](https://github.com/zce/zce.me/workflows/CI/badge.svg)

> zce.me site source code, created with [Gatsby](https://www.gatsbyjs.org).

## Preview

- Preview: https://nightly.zce.me
- Production: https://blog.zce.me

## Getting Started

```shell
# clone repo
$ git clone https://github.com/zce/zce.me.git
$ cd zce.me
# install dependencies
$ npm install # or yarn
```

### Available Scripts

```shell
# serve with hot reload at http://localhost:8000
$ npm run dev

# format the source files.
$ npm run format

# build for production with minification
$ npm run build
```

### Deploy

```shell
# version tag
$ npm version <version> # patch | minor | major
# push tags
$ git push --follow-tags
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
- [x] Sitemap support
- [x] Offline & Manifest
  - https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/
- [x] Progressive Web Apps (PWAs)
  - https://www.gatsbyjs.org/docs/progressive-web-app/
- [x] Performance
  - https://www.gatsbyjs.org/docs/performance/
  - https://webpagetest.org/
- [ ] Authentication
  - https://www.gatsbyjs.org/docs/building-a-site-with-authentication/
  - https://www.gatsbyjs.org/tutorial/authentication-tutorial/
  - https://www.gatsbyjs.org/blog/2019-03-21-add-auth0-to-gatsby-livestream/
  - https://auth0.com/blog/securing-gatsby-with-auth0/
  - https://github.com/auth0-blog/gatsby-auth0
  - https://github.com/gatsbyjs/gatsby/issues/1100
  - https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/
  - https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
- [ ] Lighthouse CI
- [ ] Search
  - https://github.com/algolia/docsearch
  - https://www.gatsbyjs.org/docs/adding-search-with-algolia/
- TypeScript

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
- [ ] RSS feed
- [ ] Comment System (Custom service)
  - https://www.taniarascia.com/add-comments-to-static-site/
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
- [ ] Staticman
  - https://www.gatsbycentral.com/tutorial-comments-with-staticman-in-gatsby
- [ ] Underline
  - https://github.com/TryGhost/Casper/blob/master/assets/css/screen.css#L399-L414

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
