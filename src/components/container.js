/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ as: Tag = 'div', ...props }) => (
  <Tag
    {...props}
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      px: 3
    }}
  />
)
