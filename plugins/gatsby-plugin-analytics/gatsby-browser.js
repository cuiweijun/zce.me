/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// @ts-check

/** @type {import('gatsby').GatsbyBrowser['onRouteUpdate']} */
export const onRouteUpdate = ({ location = {} }) => {
  // @ts-ignore
  if (typeof window._hmt === 'undefined') return

  // @ts-ignore
  window._hmt.push([
    '_trackPageview',
    `${location.pathname}${location.search}${location.hash}`
  ])
}
