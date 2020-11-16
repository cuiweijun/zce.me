import React, { useState, useEffect } from 'react'

import { Layout, Container, Button, Tabs, Hero, Player } from '../components'

export default () => {
  const [now, setNow] = useState(0)
  useEffect(() => {
    fetch('/api/now')
      .then(res => res.json())
      .then(data => setNow(data.now))
  })
  // const [count, setCount] = React.useState(0)
  return (
    <Layout title="实验室">
      <Hero title="实验室" subtitle="新特性、新组件、新尝试" />
      <Container
        sx={{
          h2: { textAlign: 'center' },
          h3: { mt: 5 },
          hr: { my: 8 }
        }}
      >
        <div>
          <h2>Serverless functions</h2>
          <p>
            GET <code>/api/now</code>: {now}
          </p>
        </div>

        <hr />
        <div>
          <h2>Environment Variables</h2>
          <p>
            <code>NODE_ENV: {process.env.NODE_ENV}</code>
          </p>
        </div>

        <hr />

        <div sx={{ div: { mx: -2, mb: 3 }, button: { mr: 2, mb: 3 } }}>
          <h2>Buttons</h2>
          <h3>Colors</h3>
          <Button color="primary">Primary</Button>
          {/* <Button color="secondary">Secondary</Button> */}
          {/* <Button color="accent">Accent</Button> */}
          {/* <Button color="highlight">Highlight</Button> */}
          <Button color="muted">Muted</Button>
          <Button color="light">Light</Button>
          <Button color="gray">Gray</Button>
          <Button color="dark">Dark</Button>
          <Button color="#fa5252">#fa5252</Button>
          <Button color="#845ef7">#845ef7</Button>
          <h3>Sizes</h3>
          <Button color="primary" size="sm">
            Hello
          </Button>
          <Button color="primary" size="md">
            Hello
          </Button>
          <Button color="primary" size="lg">
            Hello
          </Button>
          <br />
          <Button color="dark" size="sm">
            Hello
          </Button>
          <Button color="dark" size="md">
            Hello
          </Button>
          <Button color="dark" size="lg">
            Hello
          </Button>
          <h3>Variants</h3>
          <Button color="primary" variant="base">
            Hello
          </Button>
          <Button color="primary" variant="outline">
            Hello
          </Button>
          <Button color="primary" variant="ghost">
            Hello
          </Button>
          <Button color="primary" variant="pill">
            Hello
          </Button>
          <Button color="primary" variant="elevated">
            Hello
          </Button>
          <br />
          <Button color="dark" variant="base">
            Hello
          </Button>
          <Button color="dark" variant="outline">
            Hello
          </Button>
          <Button color="dark" variant="ghost">
            Hello
          </Button>
          <Button color="dark" variant="pill">
            Hello
          </Button>
          <Button color="dark" variant="elevated">
            Hello
          </Button>
          <h3>Icons</h3>
          <Button color="primary" size="sm" icon="github" />
          <Button color="primary" size="md" icon="github" />
          <Button color="primary" size="lg" icon="github" />
          <br />
          <Button color="dark" size="sm" icon="github" />
          <Button color="dark" size="md" icon="github" />
          <Button color="dark" size="lg" icon="github" />
          <br />
          <Button color="primary" size="sm" icon="github">
            Hello
          </Button>
          <Button color="primary" size="md" icon="github">
            Hello
          </Button>
          <Button color="primary" size="lg" icon="github">
            Hello
          </Button>
          <br />
          <Button color="dark" size="sm" icon="github">
            Hello
          </Button>
          <Button color="dark" size="md" icon="github">
            Hello
          </Button>
          <Button color="dark" size="lg" icon="github">
            Hello
          </Button>
        </div>

        <hr />

        <div>
          <h2>Media Player</h2>
          <h3>MP4</h3>
          <Player
            type="video"
            source={
              'https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/9a4e916d5285890797461910025/R2nTG1RS3sYA.mp4'
            }
          />
          <h3>HLS</h3>
          <Player
            type="video"
            source={
              'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/9a4e916d5285890797461910025/v.f230.m3u8'
            }
          />
        </div>

        <hr />

        <div>
          <h2>Tabs</h2>
          <Tabs sx={{ mb: 7 }}>
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
          <Tabs sx={{ mb: 7 }}>
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
        </div>
      </Container>
    </Layout>
  )
}
