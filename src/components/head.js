/**
 * Head meta & links
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query HeadComponent {
    config {
      url
      name
      title
      description
      slogan
      keywords
      author {
        name
      }
      cover {
        childImageSharp {
          fluid {
            src
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`

const getImage = (cover, defaultCover, baseUrl) => {
  cover = cover || defaultCover
  const res = {}
  if (typeof cover === 'string') {
    res.url = /^http/.test(cover) ? cover : baseUrl + cover
  } else if (cover?.childImageSharp?.fluid) {
    res.url = baseUrl + cover.childImageSharp.fluid.src
    res.width = cover.childImageSharp.fluid.presentationWidth
    res.height = cover.childImageSharp.fluid.presentationHeight
  } else if (cover?.childImageSharp?.fixed) {
    res.url = baseUrl + cover.childImageSharr.fixed.src
    res.width = cover.childImageSharr.fixed.width
    res.height = cover.childImageSharr.fixed.height
  }
  return res
}

const Head = props => {
  const { config } = useStaticQuery(query)

  const res = {}

  const url = props.pathname && config.url + props.pathname

  if (url) {
    res.meta = [{ name: 'og:url', content: url }]
    res.link = [{ rel: 'canonical', href: url }]
  } else {
    const title = props.title
      ? `${props.title} - ${config.title}`
      : `${config.title} | ${config.slogan}`
    const description = props.description || config.description
    const keywords = props.keywords || config.keywords
    const type = props.type || 'website'
    const prev = props.prev && config.url + props.prev
    const next = props.next && config.url + props.next
    const image = getImage(props.cover, config.cover, config.url)

    res.defer = false
    res.title = title
    res.meta = [
      description && { name: 'description', content: description },
      keywords && { name: 'keywords', content: keywords },
      { name: 'author', content: config.author.name },
      { name: 'og:site_name', content: config.name },
      title && { name: 'og:title', content: title },
      description && { name: 'og:description', content: description },
      { name: 'og:type', content: type },
      image.url && { name: 'og:image', content: image.url },
      image.width && { name: 'og:image:width', content: image.width },
      image.height && { name: 'og:image:height', content: image.height }
    ].filter(i => i)
    res.link = [
      prev && { rel: 'prev', href: prev },
      next && { rel: 'next', href: next }
    ].filter(i => i)
  }

  return <Helmet {...res} />
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.string,
  pathname: PropTypes.string,
  prev: PropTypes.string,
  next: PropTypes.string
}

export default Head
