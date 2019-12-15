export const getMeta = (meta, key) => {
  if (!meta) return
  if (!Array.isArray(meta)) return meta[key]
  for (const item of meta) {
    if (item.key === key) return item.value
  }
}
