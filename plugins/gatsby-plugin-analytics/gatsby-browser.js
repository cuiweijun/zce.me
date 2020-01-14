export const onRouteUpdate = ({ location = {} }) => {
  if (typeof _hmt === 'undefined') return

  window._hmt.push([
    '_trackPageview',
    `${location.pathname}${location.search}${location.hash}`
  ])
}
