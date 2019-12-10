/** @jsx jsx */
import { jsx } from 'theme-ui'
// import { useState } from 'react'

import { Layout, Container, Button, Tabs, Player } from '../components'

export default () => {
  // const [count, setCount] = useState(0)
  return (
    <Layout title="Labs" cover={false}>
      <Container sx={{ p: 6 }}>
        <h3>Colors</h3>
        <div sx={{ mx: -2, mb: 3 }}>
          <Button color="primary" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="secondary" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="accent" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="highlight" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="muted" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="light" sx={{ m: 2 }}>
            Hello
          </Button>
          {/* <Button color="gray" sx={{ m: 2 }}>
          Hello
        </Button> */}
          <Button color="dark" sx={{ m: 2 }}>
            Hello
          </Button>
        </div>
        <h3>Sizes</h3>
        <div sx={{ mx: -2, mb: 3 }}>
          <Button color="primary" size="sm" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="primary" size="md" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="primary" size="lg" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="dark" size="sm" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="dark" size="md" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="dark" size="lg" sx={{ m: 2 }}>
            Hello
          </Button>
        </div>
        <h3>Variants</h3>
        <div sx={{ mx: -2, mb: 3 }}>
          <div>
            <Button color="primary" variant="base" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" variant="outline" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" variant="ghost" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" variant="pill" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" variant="elevated" sx={{ m: 2 }}>
              Hello
            </Button>
          </div>
          <div>
            <Button color="dark" variant="base" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" variant="outline" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" variant="ghost" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" variant="pill" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" variant="elevated" sx={{ m: 2 }}>
              Hello
            </Button>
          </div>
        </div>
        <h3>Icons</h3>
        <div sx={{ mx: -2, mb: 3 }}>
          <div>
            <Button color="primary" size="sm" icon="heart" sx={{ m: 2 }} />
            <Button color="primary" size="md" icon="heart" sx={{ m: 2 }} />
            <Button color="primary" size="lg" icon="heart" sx={{ m: 2 }} />
            <Button color="dark" size="sm" icon="heart" sx={{ m: 2 }} />
            <Button color="dark" size="md" icon="heart" sx={{ m: 2 }} />
            <Button color="dark" size="lg" icon="heart" sx={{ m: 2 }} />
          </div>
          <div>
            <Button color="primary" size="sm" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" size="md" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="primary" size="lg" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" size="sm" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" size="md" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
            <Button color="dark" size="lg" icon="heart" sx={{ m: 2 }}>
              Hello
            </Button>
          </div>
        </div>

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
        {/* <h1 onClick={() => setCount(count + 1)}>Labs {count}</h1> */}
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
