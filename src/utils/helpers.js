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

export const getMeta = (meta, key, def) => {
  if (!meta) return def
  if (!Array.isArray(meta)) return meta[key] || def
  const item = meta.find(i => i.key === key)
  return item ? item.value : def
}
