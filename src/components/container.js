/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div
    {...props}
    sx={{
      marginX: 'auto',
      paddingX: 3,
      maxWidth: t => t.sizes.container
    }}
  />
)
