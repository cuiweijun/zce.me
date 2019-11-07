import React from 'react'
import { Box } from '@chakra-ui/core'

const Container = props => (
  <Box maxWidth="container" marginX="auto" paddingX={4} {...props} />
)

Container.propTypes = Box.propTypes

export default Container
