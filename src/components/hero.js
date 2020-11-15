/**
 * Hero
 */

import React from 'react'
import PropTypes from 'prop-types'

import Container from './container'

const Hero = ({ title, subtitle, padding, children, ...props }) => (
  <header
    {...props}
    sx={{
      py: '5rem',
      textAlign: 'center',
      color: 'text',
      fontSize: 'xl'
    }}
  >
    {children || (
      <Container sx={{ '> :last-child': { mb: 0 } }}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </Container>
    )}
  </header>
)

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  padding: PropTypes.oneOf(['compact', 'normal', 'loose']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Hero
