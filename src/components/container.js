/**
 * Container
 */

import React from 'react'

export default ({
  as: Tag = 'div',
  width = 'container',
  row = false,
  ...props
}) => (
  <Tag
    {...props}
    css={t => ({
      display: row && 'flex',
      flexWrap: row && 'wrap',
      maxWidth: t.sizes[width] ?? width,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: row || t.space[3],
      paddingRight: row || t.space[3]
    })}
  />
)
