/**
 * Page layout
 * with SEO Meta
 */

import React from 'react'
import PropTypes from 'prop-types'

import Head from './head'

const Layout = ({ children, ...props }) => (
  <>
    <Head {...props} />
    <main id="content" children={children} />
  </>
)

Layout.propTypes = {
  ...Head.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout
