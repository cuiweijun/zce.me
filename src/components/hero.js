/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'

import Container from './container'
import Image from './image'

const query = graphql`
  query HeroComponent {
    meta: config {
      name
      description
      cover {
        ...CoverImage
      }
    }
  }
`
const Fragment = p => p.children

const Cover = ({ image, mask = 2 }) => (
  <Image
    file={image}
    sx={{
      position: 'absolute !important',
      top: 0,
      zIndex: 'low',
      width: '100%',
      minHeight: '35rem',
      maxHeight: '65vw',
      backgroundColor: 'dark',
      ':before,:after': mask > 0 && {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 'high',
        content: '""',
        transition: 'opacity 0.3s'
      },
      ':before': mask > 0 && {
        background: `0/4px url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' stroke='%23000' stroke-linecap='square' stroke-width='0.5'%3E%3Cline x1='0' y1='1' x2='1' y2='0'/%3E%3Cline x1='1' y1='2' x2='2' y2='1'/%3E%3C/svg%3E")`,
        opacity: 0.6
      },
      ':after': mask > 1 && {
        background: t =>
          `linear-gradient(transparent 30%,${t.colors.background})`
      }
    }}
  />
)

export default ({ title, subtitle, padding, cover, mask, children }) => {
  const { meta } = useStaticQuery(query)

  if (children) return children

  const style = {
    paddingY: padding || '10vw',
    textAlign: 'center',
    color: cover === false ? 'text' : 'white',
    transition: 'padding 0.3s, color 0.3s'
  }

  if (!title) {
    title = meta.name
    subtitle = meta.description
  }

  return (
    <Fragment>
      <Container sx={style}>
        <h1 sx={{ fontSize: 9 }}>{title}</h1>
        {subtitle && <p sx={{ fontSize: 'xl' }}>{subtitle}</p>}
      </Container>
      {cover !== false && <Cover image={cover || meta.cover} mask={mask} />}
    </Fragment>
  )
}

export const GraphQLFragment = graphql`
  # Load layout cover image required data.
  fragment CoverImage on File {
    childImageSharp {
      fluid(maxWidth: 1080, maxHeight: 720, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
        presentationWidth
        presentationHeight
      }
    }
  }
`
