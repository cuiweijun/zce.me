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

export default ({ title, subtitle, children, ...props }) => {
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
