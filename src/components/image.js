/** @jsx jsx */
import { jsx } from 'theme-ui'
import Image from 'gatsby-image'

export default ({ as: Tag, file, ...props }) =>
  file ? (
    <Image
      {...props}
      Tag={Tag}
      fluid={file.childImageSharp.fluid}
      fixed={file.childImageSharp.fixed}
    />
  ) : null
