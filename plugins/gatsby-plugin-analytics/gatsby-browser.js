/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onRouteUpdate = ({ location = {} }) => {
  if (typeof _hmt === 'undefined') return

  window._hmt.push([
    '_trackPageview',
    `${location.pathname}${location.search}${location.hash}`
  ])
}
