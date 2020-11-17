/**
 * Link
 */

import React from 'react'
import { Link } from 'gatsby'

const isHash = input => /^#/.test(input)
const isAbsolute = input => /^http/.test(input)

export default ({ to, ...props }) => {
  const styles = {
    color: 'currentColor',
    ':hover': {
      textDecoration: 'none'
    }
  }

  if (isHash(to) || isAbsolute(to)) {
    // eslint-disable-next-line
    return <a {...props} href={to} css={styles} />
  }

  // activeClassName="active" partiallyActive
  return <Link {...props} to={to} css={styles} />
}
