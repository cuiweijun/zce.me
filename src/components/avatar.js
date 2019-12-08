/** @jsx jsx */
import { jsx } from 'theme-ui'
import defaultAvatar from '../assets/avatar.svg'

export default ({ image, name, size, ...props }) => (
  <img
    {...props}
    alt={name}
    src={image ? image.childImageSharp.fixed.src : defaultAvatar}
    srcSet={image && image.childImageSharp.fixed.srcSet}
    loading="lazy"
    sx={{
      maxWidth: size,
      maxHeight: size,
      borderRadius: 'circle'
    }}
  />
)
