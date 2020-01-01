/**
 * Head meta & links
 */

import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'

import { get } from '../utils'

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

const getImage = (cover, defaultCover, baseurl) => {
  cover = cover || defaultCover
  const res = {}
  if (typeof cover === 'string') {
    res.url = /^http/.test(cover) ? cover : baseurl + cover
  } else if (get(cover, 'childImageSharp.fluid')) {
    res.url = baseurl + get(cover, 'childImageSharp.fluid.src')
    res.width = get(cover, 'childImageSharp.fluid.presentationWidth')
    res.height = get(cover, 'childImageSharp.fluid.presentationHeight')
  } else if (get(cover, 'childImageSharp.fixed')) {
    res.url = baseurl + get(cover, 'childImageSharp.fixed.src')
    res.width = get(cover, 'childImageSharp.fixed.width')
    res.height = get(cover, 'childImageSharp.fixed.height')
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
