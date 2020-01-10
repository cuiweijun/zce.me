/**
 * Loader
 */

// Prevent duplicate loading
const cache = []

export const loadStyle = url => {
  if (cache.includes(url)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    // link.id = `style-${Date.now()}`
    link.rel = 'stylesheet'
    link.href = url
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
    cache.push(url)
  })
}

export const loadScript = url => {
  if (cache.includes(url)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    // script.id = `script-${Date.now()}`
    script.async = true
    // script.defer = true
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
    cache.push(url)
  })
}
