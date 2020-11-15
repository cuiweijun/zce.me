/**
 * Cover
 */

import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'

import Image from './image'

const query = graphql`
  query CoverComponent {
    meta: config {
      cover {
        ...CoverImage
      }
    }
  }
`

const Cover = ({ image, type = 2, ...props }) => {
  const { meta } = useStaticQuery(query)

  return (
    <Image
      {...props}
      file={image || meta.cover}
      sx={{
        position: 'absolute !important',
        top: 0,
        zIndex: -1,
        width: '100%',
        minHeight: '40rem',
        maxHeight: '100vh',
        bg: 'dark',
        ':before,:after': type > 0 && {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          content: '""'
        },
        ':before': type > 0 && {
          // background: `0/2px url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' stroke='%23000' stroke-linecap='square' stroke-width='1'%3E%3Cline x1='0' y1='1' x2='1' y2='0'/%3E%3Cline x1='1' y1='2' x2='2' y2='1'/%3E%3C/svg%3E")`,
          background:
            '0/10px url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAlElEQVRoge3XsQmAQBQE0S1H+y/l7EcxMBER9QT/4IQ/mw0exyXJlGRI0pLMH91jx42OX+9P498Yg45vVQz0jEHHlzPwZAw6vqyBO2PQ8eUNXBmDjscYOBuDjscZOBqDjteABnwH4PEIA/4HNPB3A74D1ceg45EG9jc6Hm1gu9HxGqhwa0ADGtCABjSgAQ1oABmftAVn11AarBfn/QAAAABJRU5ErkJggg==)',
          opacity: 0.6
        },
        ':after': type > 1 && {
          background: t =>
            `linear-gradient(transparent 45%, ${t.colors.background})`
        },
        img: type > 2 && {
          filter: 'blur(5rem)',
          transform: 'translateZ(0) scale(1.1)'
        },
        '+ header': {
          color: 'white',
          textShadow: 'text'
        }
      }}
    />
  )
}

Cover.types = {
  image: 0,
  mask: 1,
  gradient: 2,
  blur: 3
}

Cover.propTypes = {
  image: PropTypes.object,
  type: PropTypes.oneOf(Object.values(Cover.types))
}

export const GraphQLFragment = graphql`
  # Load layout cover image required data.
  fragment CoverImage on File {
    childImageSharp {
      fluid(maxWidth: 1080, maxHeight: 720, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
        presentationWidth
        presentationHeight
      }
    }
  }
`

export default Cover
