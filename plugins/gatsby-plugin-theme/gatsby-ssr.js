/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'

export { wrapRootElement } from './gatsby-browser'

export const replaceRenderer = ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString
}) => {
  const { ids, css, html } = extractCritical(renderToString(bodyComponent))
  setHeadComponents([<style data-emotion-css={ids.join(' ')} children={css} />])
  replaceBodyHTMLString(html)
}

// for prevent flashing
export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    style: {
      opacity: 0,
      background: '#35363a',
      transition: 'opacity 1s'
    }
  })
}
