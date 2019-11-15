/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import { Layout } from '../components'

export default () => {
  const [count, setCount] = useState(0)
  return (
    <Layout title="Labs">
      <h1 onClick={() => setCount(count + 1)}>Labs {count}</h1>
    </Layout>
  )
}
