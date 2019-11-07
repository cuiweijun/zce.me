import React from 'react'
import { Box } from '@chakra-ui/core'

import Header from './header'
import Footer from './footer'

export default props => {
  return (
    <>
      <Header />
      <Box as="main" position="relative" minHeight="100vh" {...props} />
      <Footer />
    </>
  )
}

// const SkipLink = props => (
//   <a
//     {...props}
//     href="#content"
//     children="Skip to content"
//     sx={{
//       clip: 'rect(0 0 0 0)',
//       height: 1,
//       width: 1,
//       m: -1,
//       p: 0,
//       overrflow: 'hidden',
//       position: 'absolute',
//       top: -9999,
//       ':focus': {
//         position: 'fixed',
//         zIndex: 4,
//         top: 0,
//         left: 0,
//         m: 2,
//         p: 3,
//         fontWeight: 'bold',
//         color: 'black',
//         bg: 'white',
//         width: 'auto',
//         height: 'auto',
//         clip: 'auto'
//       }
//     }}
//   />
// )
