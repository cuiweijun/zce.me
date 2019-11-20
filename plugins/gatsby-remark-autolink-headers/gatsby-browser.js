// ref: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-autolink-headers/src/gatsby-browser.js

let offsetY = 10

const getTargetOffset = hash => {
  const id = window.decodeURI(hash.substr(1))
  if (!id) return null
  const element = document.getElementById(id)
  if (element) return element.offsetTop - offsetY
}

export const onInitialClientRender = (_, pluginOptions) => {
  if (pluginOptions.offsetY) {
    offsetY = pluginOptions.offsetY
  }

  requestAnimationFrame(() => {
    const offset = getTargetOffset(window.location.hash)
    offset && window.scrollTo(0, offset)
  })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  const offset = getTargetOffset(location.hash)
  return offset ? [0, offset] : true
}
