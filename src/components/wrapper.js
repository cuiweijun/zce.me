/**
 * Wrapper for wrapPageElement
 * Prevent layout components from unmounting
 * ref:
 * - https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
 */

import React from 'react'

import Head from './head'
import SkipLink from './skip-link'
import Header from './header'
import Footer from './footer'

export default ({ location, children }) => (
  <>
    <Head pathname={location.pathname} />
    <SkipLink />
    <Header />
    {children}
    <Footer />
  </>
)
