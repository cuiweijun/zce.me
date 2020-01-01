/**
 * Container
 */

import React from 'react'

// export default ({ as: Tag = 'div', width = 'container', ...props }) => (
//   <Tag {...props} sx={{ maxWidth: width, mx: 'auto', px: 3 }} />
// )

// export default ({ as: Tag = 'div', ...props }) => (
//   <Tag {...props} sx={{ display: 'flex', flexWrap: 'wrap', mx: -3 }} />
// )

export default ({
  as: Tag = 'div',
  width = 'container',
  row = false,
  ...props
}) => (
  <Tag
    {...props}
    sx={{
      display: row && 'flex',
      flexWrap: row && 'wrap',
      maxWidth: width,
      mx: 'auto',
      px: row || 3
    }}
  />
)
