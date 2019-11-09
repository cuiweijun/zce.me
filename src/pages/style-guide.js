/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container, Button, IconButton } from '../components'

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
      <div sx={{ mx: -2, mb: 3 }}>
        <Button size="lg" variant="none" sx={{ m: 3 }}>
          Hello
        </Button>
        <Button size="lg" variant="default" sx={{ m: 3 }}>
          Hello
        </Button>
        <Button size="lg" variant="primary" sx={{ m: 3 }}>
          Hello
        </Button>
        <Button size="lg" variant="outline" sx={{ m: 3 }}>
          Hello
        </Button>
        <Button size="lg" variant="ghost" sx={{ m: 3 }}>
          Hello
        </Button>
        <Button size="lg" variant="elevated" sx={{ m: 3 }}>
          Hello
        </Button>
      </div>
      <div>
        <IconButton icon="heart" variant="none" sx={{ m: 3 }} />
        <IconButton icon="heart" variant="default" sx={{ m: 3 }} />
        <IconButton icon="heart" variant="primary" sx={{ m: 3 }} />
        <IconButton icon="heart" variant="outline" sx={{ m: 3 }} />
        <IconButton icon="heart" variant="ghost" sx={{ m: 3 }} />
        <IconButton icon="heart" variant="elevated" sx={{ m: 3 }} />
      </div>
      <div>
        <IconButton size="sm" icon="heart" variant="none" sx={{ m: 3 }} />
        <IconButton size="sm" icon="heart" variant="default" sx={{ m: 3 }} />
        <IconButton size="sm" icon="heart" variant="primary" sx={{ m: 3 }} />
        <IconButton size="sm" icon="heart" variant="outline" sx={{ m: 3 }} />
        <IconButton size="sm" icon="heart" variant="ghost" sx={{ m: 3 }} />
        <IconButton size="sm" icon="heart" variant="elevated" sx={{ m: 3 }} />
      </div>
      <div>
        <IconButton size="lg" icon="heart" variant="none" sx={{ m: 3 }} />
        <IconButton size="lg" icon="heart" variant="default" sx={{ m: 3 }} />
        <IconButton size="lg" icon="heart" variant="primary" sx={{ m: 3 }} />
        <IconButton size="lg" icon="heart" variant="outline" sx={{ m: 3 }} />
        <IconButton size="lg" icon="heart" variant="ghost" sx={{ m: 3 }} />
        <IconButton size="lg" icon="heart" variant="elevated" sx={{ m: 3 }} />
      </div>
      <div>
        <IconButton icon="heart" variant="none" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton icon="heart" variant="default" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton icon="heart" variant="primary" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton icon="heart" variant="outline" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton icon="heart" variant="ghost" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton icon="heart" variant="elevated" sx={{ m: 3 }}>
          Icon
        </IconButton>
      </div>
      <div>
        <IconButton size="sm" icon="heart" variant="none" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="sm" icon="heart" variant="default" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="sm" icon="heart" variant="primary" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="sm" icon="heart" variant="outline" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="sm" icon="heart" variant="ghost" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="sm" icon="heart" variant="elevated" sx={{ m: 3 }}>
          Icon
        </IconButton>
      </div>
      <div>
        <IconButton size="lg" icon="heart" variant="none" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="lg" icon="heart" variant="default" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="lg" icon="heart" variant="primary" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="lg" icon="heart" variant="outline" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="lg" icon="heart" variant="ghost" sx={{ m: 3 }}>
          Icon
        </IconButton>
        <IconButton size="lg" icon="heart" variant="elevated" sx={{ m: 3 }}>
          Icon
        </IconButton>
      </div>
    </Container>
  </div>
)
