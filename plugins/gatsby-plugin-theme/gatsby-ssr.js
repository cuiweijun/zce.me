/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 * Ref:
 * - https://github.com/emotion-js/emotion/blob/master/site/plugins/gatsby-plugin-emotion-next-compat/gatsby-ssr.js
 */

// @ts-check

import React from 'react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'

import cache from './cache'

export { wrapRootElement } from './gatsby-browser'

// extract styles
const { extractCritical } = createEmotionServer(cache)

/** @type {import('gatsby').GatsbySSR['replaceRenderer']} */
// @ts-ignore
export const replaceRenderer = async ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString
}) => {
  const { ids, css, html } = extractCritical(renderToString(bodyComponent))
  setHeadComponents([
    <style
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{ __html: css }}
    />
  ])
  replaceBodyHTMLString(html)
}

// for prevent flashing
/** @type {import('gatsby').GatsbySSR['onRenderBody']} */
export const onRenderBody = async ({ setBodyAttributes }) => {
  setBodyAttributes({
    style: {
      opacity: 0,
      transition: 'opacity 0.5s'
    }
  })
}
