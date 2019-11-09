/** @jsx jsx */
import { jsx } from 'theme-ui'
import Container from './container'
import Cover from './cover'

export default ({ title, subtitle, cover, children, ...props }) => (
  <div {...props} sx={{ paddingY: '10vw' }}>
    {title ? (
      <Container
        sx={{ textAlign: 'center', color: cover ? 'background' : 'text' }}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
      </Container>
    ) : (
      children
    )}
    {cover && <Cover image={cover} />}
  </div>
)
