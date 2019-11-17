/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import Meta from './meta'
import Header from './header'
import Footer from './footer'

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

export default props => (
  <Fragment>
    <Meta
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.cover}
      type={props.type}
    />
    <Header
      title={props.title}
      subtitle={props.subtitle}
      padding={props.padding}
      align={props.align}
      cover={props.cover}
      mask={props.mask}
      hero={props.hero}
    />
    <main
      id="content"
      children={props.children}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '40vh',
        backgroundColor: props.background
      }}
    />
  </Fragment>
)

// for wrapPageElement
// Prevent layout components from unmounting
// https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Wrapper = props => (
  <Fragment>
    <Meta pathname={props.location.pathname} />
    <SkipLink />
    {props.children}
    <Footer />
  </Fragment>
)
