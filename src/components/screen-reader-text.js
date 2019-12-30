import React from 'react'

export default ({ as: Tag = 'span', ...props }) => {
  return (
    <Tag
      {...props}
      sx={{
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        p: 0,
        width: 1,
        height: 1,
        border: 0,
        whiteSpace: 'nowrap'
      }}
    />
  )
}
