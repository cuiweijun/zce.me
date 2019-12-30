import React from 'react'

export default ({ as: Tag = 'div', width = 'container', ...props }) => (
  <Tag
    {...props}
    sx={{
      maxWidth: width,
      mx: 'auto',
      px: 3
    }}
  />
)
