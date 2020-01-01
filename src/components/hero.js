/**
 * Hero
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Container from './container'

const query = graphql`
  query HeroComponent {
    meta: config {
      name
      description
    }
  }
`

const Hero = ({ title, subtitle, padding, align, hero }) => {
  const { meta } = useStaticQuery(query)

  if (!title) {
    title = meta.name
    subtitle = meta.description
  }

  return (
    <section
      // role="banner"
      sx={{
        py: padding || '10vw',
        textAlign: align || 'center',
        color: 'white',
        textShadow: 'text'
        // TODO: transition
        // transition: 'padding 0.3s, color 0.3s'
      }}>
      {hero || (
        <Container>
          <h1 sx={{ fontSize: 9 }}>{title}</h1>
          {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
        </Container>
      )}
    </section>
  )
}

export default Hero
