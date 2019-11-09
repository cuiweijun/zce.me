/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ as: Tag = 'div', ...props }) => (
  <Tag
    {...props}
    sx={{
      marginX: 'auto',
      paddingX: 3,
      maxWidth: t => t.sizes.container
    }}
  />
)
