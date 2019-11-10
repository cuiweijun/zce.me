/** @jsx jsx */
import { jsx } from 'theme-ui'
import Container from './container'

export default ({ title, subtitle, children, ...props }) => (
  <div {...props} sx={{ paddingY: '10vw' }}>
    {title ? (
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
      </Container>
    ) : (
      children
    )}
  </div>
)
