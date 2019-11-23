/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ image, name, size = 'auto', ...props }) => (
  <img
    {...props}
    alt={name}
    src={image.childImageSharp.fixed.src}
    srcSet={image.childImageSharp.fixed.srcSet}
    sx={{
      maxWidth: size,
      maxHeight: size,
      border: 3,
      borderColor: 'border',
      borderRadius: 'circle'
    }}
  />
)
