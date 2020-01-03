/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={cache}>{element}</CacheProvider>
)

// for prevent flashing
export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.style.opacity = null
    document.body.style.background = null
  })
}
