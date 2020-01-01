/**
 * Page layout
 * SEO Meta & Hero
 */

import React from 'react'

import Head from './head'
import Cover from './cover'
import Hero from './hero'

const Layout = ({ ...props }) => (
  <>
    <Head {...props} />
    <Cover {...props} />
    <Hero {...props} />
    <main
      id="content"
      sx={
        {
          // display: 'flow-root',
          // flexDirection: 'column',
          // position: 'relative',
          // fix sticky
          // overflow: 'hidden',
          // minHeight: '40vh',
          // bg: props.background,
          // transition: 'background 0.3s'
        }
      }>
      {props.children}
    </main>
  </>
)

Layout.propTypes = {
  ...Head.propTypes,
  ...Cover.propTypes
}

export default Layout
