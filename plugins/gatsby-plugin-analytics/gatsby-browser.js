export const onRouteUpdate = ({ location = {} }) => {
  // Don't track while developing.
  if (process.env.NODE_ENV !== 'production' || typeof _hmt !== 'function') {
    return
  }

  window._hmt.push([
    '_trackPageview',
    `${location.pathname}${location.search}${location.hash}`
  ])
}
analyticsanalytics
