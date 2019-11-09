/** @jsx jsx */
import { Fragment, cloneElement } from 'react'
import { jsx } from 'theme-ui'

import Header from './header'
import Footer from './footer'

// TODO: transition
// https://scotch.io/tutorials/animated-page-transitions-in-gatsby-websites

// Layout props
// https://github.com/gatsbyjs/gatsby/issues/2112
// https://github.com/lillylabs/lt-cph-window/blob/master/gatsby-browser.js
export default props => {
  const setTitle = t => {
    console.log(t)
  }
  return (
    <Fragment>
      <Header />
      {/* <main {...props} sx={{ position: 'relative' }} /> */}
      <main sx={{ position: 'relative' }}>
        {cloneElement(props.children, { setTitle })}
      </main>
      <Footer />
    </Fragment>
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
