import React from 'react'

import defaultAvatar from '../assets/avatar.svg'

export default ({ image, name, size, ...props }) => (
  <img
    {...props}
    alt={name}
    src={image ? image.childImageSharp.fixed.src : defaultAvatar}
    srcSet={image && image.childImageSharp.fixed.srcSet}
    loading="lazy"
    sx={{ borderRadius: 'circle', bg: 'white' }}
  />
)
