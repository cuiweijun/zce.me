/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container, Button } from '../components'

export default props => (
  <div>
    <Container sx={{ padding: 6 }}>
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
        <Button color="gray" sx={{ m: 2 }}>
          Hello
        </Button>
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
          <Button color="muted" variant="base" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="muted" variant="outline" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="muted" variant="ghost" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="muted" variant="pill" sx={{ m: 2 }}>
            Hello
          </Button>
          <Button color="muted" variant="elevated" sx={{ m: 2 }}>
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
    </Container>
  </div>
)
