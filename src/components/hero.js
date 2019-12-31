/**
 * Hero
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Container from './container'
import Image from './image'

const query = graphql`
  query HeroComponent {
    meta: config {
      name
      description
      cover {
        ...CoverImage
      }
    }
  }
`

const Heading = ({ title, subtitle, children, ...props }) => {
  const { meta } = useStaticQuery(query)

  if (children) return children

  if (!title) {
    title = meta.name
    subtitle = meta.description
  }

  return (
    <Container {...props}>
      <h1 sx={{ fontSize: 9 }}>{title}</h1>
      {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
    </Container>
  )
}

const Cover = ({ image, mask = 2 }) => {
  const { meta } = useStaticQuery(query)
  return (
    <Image
      file={image || meta.cover}
      sx={{
        position: 'absolute !important',
        top: 0,
        zIndex: -1,
        width: '100%',
        minHeight: '40rem',
        maxHeight: '100vh',
        bg: 'dark',
        ':before,:after': mask > 0 && {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          content: '""',
          transition: 'opacity 0.3s'
        },
        ':before': mask > 0 && {
          background: `0/4px url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' stroke='%23000' stroke-linecap='square' stroke-width='0.5'%3E%3Cline x1='0' y1='1' x2='1' y2='0'/%3E%3Cline x1='1' y1='2' x2='2' y2='1'/%3E%3C/svg%3E")`,
          opacity: 0.6
        },
        ':after': mask > 1 && {
          background: t =>
            `linear-gradient(transparent 45%, ${t.colors.background})`
        },
        img: mask > 2 && {
          filter: 'blur(5rem)',
          transform: 'translateZ(0) scale(1.1)'
        }
      }}
    />
  )
}

export default ({ title, subtitle, hero, padding, align, cover, mask }) => (
  <section
    role="banner"
    sx={{
      py: padding || '10vw',
      textAlign: align || 'center',
      color: cover === false ? 'text' : 'white',
      textShadow: cover === false ? null : 'text'
      // TODO: transition
      // transition: 'padding 0.3s, color 0.3s'
    }}>
    {hero !== false && (
      <Heading title={title} subtitle={subtitle} children={hero} />
    )}
    {cover !== false && <Cover image={cover} mask={mask} />}
  </section>
)

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
