export const onRouteUpdate = ({ location = {} }) => {
  if (typeof _hmt !== 'function') return

  window._hmt.push([
    '_trackPageview',
    `${location.pathname}${location.search}${location.hash}`
  ])
}
