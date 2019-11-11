/** @jsx jsx */
import { jsx } from 'theme-ui'
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

// TODO: transition
export default ({ title, subtitle, padding, cover, children }) => {
  const { meta } = useStaticQuery(query)

  if (!children) {
    const style = {
      paddingY: padding || '10vw',
      textAlign: 'center',
      color: cover === false ? 'text' : 'white',
      textShadow: cover === false ? '0' : 'text',
      transition: 'padding 0.3s, color 0.3s'
    }

    if (!title) {
      title = meta.name
      subtitle = meta.description
    }

    children = (
      <Container sx={style}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
      </Container>
    )
  }

  return children
}
