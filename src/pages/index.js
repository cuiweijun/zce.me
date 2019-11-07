/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Button, Container, Layout } from '../components'

export default ({ location }) => (
  <Layout className="index" title="Index" location={location}>
    <Container>
      <Button variant="base" sx={{ mr: 2 }}>
        Button
      </Button>
      <Button variant="primary" sx={{ mr: 2 }}>
        Button
      </Button>
      <Button variant="outline" sx={{ mr: 2 }}>
        Button
      </Button>
      <Button variant="secondary" sx={{ mr: 2 }}>
        Button
      </Button>
      <Button variant="large" sx={{ mr: 2 }}>
        Button
      </Button>
      <Button variant="transparent" sx={{ mr: 2 }}>
        Button
      </Button>
    </Container>
  </Layout>
)
