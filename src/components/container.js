import React from 'react'
import { Box } from 'rebass'

export default props => (
  <Box maxWidth={[640, 768, 1024, 1280]} mx="auto" px={3} {...props} />
)
