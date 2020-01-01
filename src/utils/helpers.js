/**
 * Helper functions
 */

export const get = (obj, key, def) => {
  key = key.split ? key.split('.') : key
  key.forEach(key => {
    obj = obj ? obj[key] : undefined
  })
  return obj === undefined ? def : obj
}

export const getMeta = (meta, key) => {
  if (!meta) return
  if (!Array.isArray(meta)) return meta[key]
  for (const item of meta) {
    if (item.key === key) return item.value
  }
}
