export const loadStyle = url =>
  new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.id = `style-${Date.now()}`
    link.rel = 'stylesheet'
    link.href = url
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })

export const loadScript = url =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = `script-${Date.now()}`
    script.async = true
    // script.defer = true
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
