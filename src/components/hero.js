/**
 * Hero
 */

import React from 'react'
import PropTypes from 'prop-types'
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

const Hero = ({ title, subtitle, children, ...props }) => {
  const { meta } = useStaticQuery(query)

  if (!title) {
    title = meta.name
    subtitle = meta.description
  }

  return (
    <header
      {...props}
      sx={{
        py: '10vw',
        textAlign: 'center',
        color: 'white',
        fontSize: 'xl',
        textShadow: 'text'
        // transition: 'padding 0.3s' // TODO: ???
      }}>
      {children || (
        <Container>
          <h1 sx={{ fontSize: 9 }}>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </Container>
      )}
    </header>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Hero
