/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// @ts-check

import React from 'react'

import { Wrapper } from './src/components'

/** @type {import('gatsby').GatsbyBrowser['wrapPageElement']} */
export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

/** @type {import('gatsby').GatsbyBrowser['onServiceWorkerUpdateReady']} */
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm('此应用程序已更新，重新加载以显示最新版本？')
  answer && window.location.reload()
}

/** @type {import('gatsby').GatsbyBrowser['registerServiceWorker']} */
export const registerServiceWorker = () => true
