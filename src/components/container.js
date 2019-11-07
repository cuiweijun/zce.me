/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div
    sx={{
      mx: 'auto',
      px: 3,
      maxWidth: t => t.sizes.container
    }}
    {...props}
  />
)
