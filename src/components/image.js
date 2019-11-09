/** @jsx jsx */
import { jsx } from 'theme-ui'
import Img from 'gatsby-image'

export default ({ as: Tag, file, ...props }) =>
  file ? (
    <Img
      {...props}
      Tag={Tag}
      fluid={file.childImageSharp.fluid}
      fixed={file.childImageSharp.fixed}
    />
  ) : null
