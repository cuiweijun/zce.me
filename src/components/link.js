/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const isHash = input => /^#/.test(input)
const isAbsolute = input => /^http/.test(input)

export default ({ to, ...props }) => {
  // variant = `variants.links.${variant}`

  if (isHash(to) || isAbsolute(to)) {
    // eslint-disable-next-line
    return <a {...props} href={to} />
  }

  return <GatsbyLink {...props} to={to} />
}