/**
 * Image
 */

import React from 'react'
import Image from 'gatsby-image'

export default ({ as: Tag, file, ...props }) =>
  file && (
    <Image
      {...props}
      Tag={Tag}
      fluid={file.childImageSharp?.fluid}
      fixed={file.childImageSharp?.fixed}
    />
  )
