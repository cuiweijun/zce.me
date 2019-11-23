/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import { Layout, Container, Tabs, Player } from '../components'

export default () => {
  const [count, setCount] = useState(0)
  return (
    <Layout title="Labs" bacground="background">
      <Container>
        <Player
          type="video"
          sources={
            'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5fd738af5285890794219270219/v.f20.mp4'
          }
        />
        <hr />
        <Player
          type="video"
          sources={[
            {
              size: 360,
              src:
                'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5fd738af5285890794219270219/v.f20.mp4'
            },
            {
              size: 720,
              src:
                'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5fd738af5285890794219270219/v.f30.mp4'
            },
            {
              size: 1080,
              src:
                'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5fd738af5285890794219270219/v.f40.mp4'
            }
          ]}
        />
        <hr />
        <h1 onClick={() => setCount(count + 1)}>Labs {count}</h1>
        <hr />
        <Tabs sx={{ p: 5 }}>
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
        <Tabs sx={{ p: 5 }}>
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
