/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 * Ref:
 * - https://github.com/emotion-js/emotion/blob/master/site/plugins/gatsby-plugin-emotion-next-compat/gatsby-ssr.js
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'

export { wrapRootElement } from './gatsby-browser'

// extract styles
export const replaceRenderer = ({
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
export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    style: {
      opacity: 0,
      transition: 'opacity 0.5s'
    }
  })
}
