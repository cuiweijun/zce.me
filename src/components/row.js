/**
 * Row
 */

import React from 'react'

export default ({ as: Tag = 'div', ...props }) => (
  <Tag
    {...props}
    css={t => ({
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: '-' + t.space[3],
      marginRight: '-' + t.space[3]
    })}
  />
)
