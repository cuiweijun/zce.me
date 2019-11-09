/** @jsx jsx */
import { jsx } from 'theme-ui'
import Container from './container'
import Cover from './cover'

export default ({
  title,
  subtitle,
  cover,
  before,
  after,
  children,
  ...props
}) => (
  <div {...props} sx={{ paddingY: '10vw' }}>
    {title ? (
      <Container sx={{ textAlign: 'center', color: cover ? 'white' : 'text' }}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
      </Container>
    ) : (
      children
    )}
    {cover && <Cover image={cover} before={before} after={after} />}
  </div>
)
