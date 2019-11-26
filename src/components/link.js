/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const isHash = input => /^#/.test(input)
const isAbsolute = input => /^http/.test(input)

export default ({ to, ...props }) => {
  // variant = `variants.links.${variant}`

  const styles = {
    color: 'currentColor'
    // ':hover': {
    //   textDecoration: 'none'
    // }
  }

  if (isHash(to) || isAbsolute(to)) {
    // eslint-disable-next-line
    return <a {...props} href={to} sx={styles} />
  }

  return <GatsbyLink {...props} to={to} sx={styles} />
}
