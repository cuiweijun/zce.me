/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ as: Tag = 'div', ...props }) => (
  <Tag
    {...props}
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      mx: -3
    }}
  />
)
