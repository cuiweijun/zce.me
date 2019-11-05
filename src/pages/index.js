import React from 'react'
import { Button } from 'rebass'

import { Layout } from '../components'

export default ({ location }) => (
  <Layout className="index" title="Index" location={location}>
    <Button>Index</Button>
  </Layout>
)
