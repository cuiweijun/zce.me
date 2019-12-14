import en from '../locales/en.yml'

const template = (source, context) => {
  if (!/{([a-z_]+)}/.test(source)) return source

  return source.replace(/{([a-z_]+)}/g, (_, key) => {
    if (context.hasOwnProperty(key)) return context[key]
    throw new Error(`Template does not support {${key}} Tag`)
  })
}

export const t = (text, context) => {
  return template(en[text] || text, context)
}
