/**
 * Loader
 */

import { withAssetPrefix } from 'gatsby'

// Prevent duplicate loading
const tasks = {}

export const loadStyle = url => {
  if (!tasks[url]) {
    tasks[url] = new Promise((resolve, reject) => {
      const link = document.createElement('link')
      // link.id = `style-${Date.now()}`
      link.rel = 'stylesheet'
      link.href = withAssetPrefix(url)
      link.onload = resolve
      link.onerror = reject
      document.head.appendChild(link)
    })
  }
  return tasks[url]
}

export const loadScript = url => {
  if (!tasks[url]) {
    tasks[url] = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      // script.id = `script-${Date.now()}`
      script.async = true
      // script.defer = true
      script.src = withAssetPrefix(url)
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })
  }
  return tasks[url]
}
