/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'
import { extractCritical } from 'emotion-server'

export const replaceRenderer = ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString
}) => {
  let { html, ids, css } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  )
  setHeadComponents([
    <style
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css
      }}
    />
  ])
  replaceBodyHTMLString(html)
}
