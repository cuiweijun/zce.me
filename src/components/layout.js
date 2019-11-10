// TODO: Prevent layout components from unmounting
// https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting

/** @jsx jsx */
import { jsx } from 'theme-ui'

import Meta from './meta'
import Header from './header'
import Footer from './footer'

const Fragment = p => p.children

const SkipLink = props => (
  <a
    {...props}
    href="#content"
    children="Skip to content"
    sx={{
      position: 'absolute',
      overrflow: 'hidden',
      height: 1,
      width: 1,
      margin: -1,
      padding: 0,
      top: -999,
      clip: 'rect(0 0 0 0)',
      ':focus': {
        position: 'fixed',
        zIndex: '999',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        margin: 2,
        padding: 3,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white',
        clip: 'auto'
      }
    }}
  />
)

export default ({
  title,
  description,
  keywords,
  header,
  cover,
  type,
  children
}) => (
  <Fragment>
    <SkipLink />
    <Meta
      title={title}
      description={description}
      keywords={keywords}
      image={cover}
      type={type}
    />
    <Header title={title} description={description} children={header} />
    <main id="content" children={children} sx={{ position: 'relative' }} />
    <Footer />
  </Fragment>
)

// --------------------------------------------------

// import { Fragment, cloneElement } from 'react'
// import { jsx } from 'theme-ui'

// import { Meta } from '../components'
// import Header from './header'
// import Footer from './footer'
// import { useRootContext } from '..'

// // TODO: transition
// // https://scotch.io/tutorials/animated-page-transitions-in-gatsby-websites
// // https://medium.com/free-code-camp/how-to-animate-page-transitions-in-gatsby-js-b36e3ae14c29

// // Layout props
// // https://github.com/gatsbyjs/gatsby/issues/2112
// // https://github.com/lillylabs/lt-cph-window/blob/master/gatsby-browser.js
// export default props => {
//   const { title } = useRootContext()
//   return (
//     <Fragment>
//       <Header />
//       <Meta title={title} />
//       {/* <main {...props} sx={{ position: 'relative' }} /> */}
//       <main children={props.children} sx={{ position: 'relative' }} />
//       {/* <main sx={{ position: 'relative' }}>
//         {cloneElement(props.children, { setTitle })}
//       </main> */}
//       <Footer />
//     </Fragment>
//   )
// }

// https://github.com/jonbellah/jonbellah.com
