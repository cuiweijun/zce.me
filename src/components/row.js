/**
 * Row
 */

import React from 'react'

export default ({ as: Tag = 'div', ...props }) => (
  <Tag {...props} sx={{ display: 'flex', flexWrap: 'wrap', mx: -3 }} />
)
