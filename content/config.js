/**
 * collection permalink tags:
 * - {slug} - the post slug, eg. my-post
 * - {year} - publication year, eg. 2019
 * - {month} - publication month, eg. 04
 * - {day} - publication day, eg. 29
 * - {author} - slug of first author, eg. cameron
 * - {category} - slug of first category, eg. tutorial
 * - {tag} - slug of first tag listed in the post, eg. news
 *
 * collection status:
 * - draft
 * - private
 * - published
 * - deprecated
 * - trashed
 */
exports.collections = {
  posts: {
    type: 'post',
    template: 'post',
    permalink: '/{year}/{month}/{slug}/',
    draft: false,
    comment: true,
    private: false,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: ['Untagged']
  },
  pages: {
    type: 'page',
    template: 'page',
    permalink: '/{slug}/',
    draft: false,
    comment: false,
    private: false,
    authors: ['Lei Wang'],
    categories: ['Uncategorized'],
    tags: ['Untagged']
  }
}

/**
 * taxonomies permalink tags:
 * - {slug} - the taxonomy slug, eg. tom-jerry
 */
exports.taxonomies = {
  authors: {
    type: 'author',
    template: 'author',
    permalink: '/authors/{slug}/'
  },
  categories: {
    type: 'category',
    template: 'category',
    permalink: '/categories/{slug}/'
  },
  tags: {
    type: 'tag',
    template: 'tag',
    permalink: '/tags/{slug}/'
  }
}
