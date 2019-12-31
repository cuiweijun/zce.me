/**
 * Page layout
 * SEO Meta & Hero
 */

import React from 'react'

import Head from './head'
// import Hero from './Hero'

export default props => (
  <>
    <Head
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.cover}
      type={props.type}
      prev={props.prev}
      next={props.next}
    />
    <main
      id="content"
      sx={{
        // display: 'flow-root',
        // flexDirection: 'column',
        // position: 'relative',
        // fix sticky
        // overflow: 'hidden',
        // minHeight: '40vh',
        bg: props.background,
        transition: 'background 0.3s'
      }}>
      {/* <Hero
        title={props.title}
        subtitle={props.subtitle}
        padding={props.padding}
        align={props.align}
        cover={props.cover}
        mask={props.mask}
        hero={props.hero}
      /> */}
      {props.children}
    </main>
  </>
)
