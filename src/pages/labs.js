/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import { Layout, Container, Tabs } from '../components'

export default () => {
  const [count, setCount] = useState(0)
  return (
    <Layout title="Labs">
      <Container>
        <h1 onClick={() => setCount(count + 1)}>Labs {count}</h1>
        <hr />
        <Tabs sx={{ padding: 5 }}>
          <section id="intro" name="介绍">
            <p>介绍内容</p>
          </section>
          <section id="toc" name="目录">
            <p>目录内容</p>
          </section>
          <section id="talk" name="讨论">
            <p>讨论内容</p>
          </section>
        </Tabs>
        <hr />
        <Tabs sx={{ padding: 5 }}>
          <section name="介绍">
            <p>介绍内容</p>
          </section>
          <section name="目录">
            <p>目录内容</p>
          </section>
          <section name="讨论">
            <p>讨论内容</p>
          </section>
        </Tabs>
      </Container>
    </Layout>
  )
}
