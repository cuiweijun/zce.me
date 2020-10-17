/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// @ts-check

import React from 'react'

/** @type {import('gatsby').GatsbySSR['onRenderBody']} */
export const onRenderBody = async ({ setPostBodyComponents }) => {
  // Don't track while developing.
  if (process.env.NODE_ENV !== 'production') return

  setPostBodyComponents(
    <script
      key="gatsby-plugin-analytics"
      src={`https://hm.baidu.com/hm.js?${process.env.GATSBY_ANALYTICS_ID}`}
    />
  )
}
