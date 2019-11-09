/** @jsx jsx */
import { jsx } from 'theme-ui'
import Image from './image'

export default ({ image, ...props }) => (
  <Image
    {...props}
    file={image}
    sx={{
      position: 'absolute !important',
      top: 0,
      zIndex: 'low',
      width: '100%',
      minHeight: '35rem',
      // maxHeight: '85vh',
      backgroundColor: 'dark',
      ':before,:after': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 'high',
        content: '""',
        transition: 'opacity 0.3s'
      },
      ':before': {
        background: `0/4px url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' stroke='%23000' stroke-linecap='square' stroke-width='0.5'%3E%3Cline x1='0' y1='1' x2='1' y2='0'/%3E%3Cline x1='1' y1='2' x2='2' y2='1'/%3E%3C/svg%3E")`,
        opacity: 0.6
      },
      ':after': {
        background: t =>
          `linear-gradient(transparent 30%,${t.colors.background})`
      }
    }}
  />
)

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
