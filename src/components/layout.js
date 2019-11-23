/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import Head from './head'
import SkipLink from './skip-link'
import Header from './header'
import Footer from './footer'

export const Layout = props => (
  <Fragment>
    <Head
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
        // display: 'flow-root',
        // flexDirection: 'column',
        // position: 'relative',
        // fix sticky
        // overflow: 'hidden',
        minHeight: '40vh',
        bg: props.background
      }}
    />
  </Fragment>
)

// for wrapPageElement
// Prevent layout components from unmounting
// https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Wrapper = props => (
  <Fragment>
    <Head pathname={props.location.pathname} />
    <SkipLink />
    {props.children}
    <Footer />
  </Fragment>
)
