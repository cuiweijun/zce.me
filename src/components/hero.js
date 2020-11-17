/**
 * Hero
 */

import React from 'react'
import PropTypes from 'prop-types'

import Container from './container'

const Hero = ({ title, subtitle, padding, children, ...props }) => (
  <header
    {...props}
    css={t => ({
      paddingTop: t.space[8],
      paddingBottom: t.space[8],
      textAlign: 'center',
      color: t.colors.text,
      fontSize: t.fontSizes.xl
    })}
  >
    {children || (
      <Container css={{ '> :last-child': { marginBottom: 0 } }}>
        <h1 css={t => ({ fontSize: t.fontSizes[9] })}>{title}</h1>
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
