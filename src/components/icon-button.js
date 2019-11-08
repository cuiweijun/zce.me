/** @jsx jsx */
import { jsx } from 'theme-ui'
import Icon from './icon'
import Button from './button'

export default ({ icon, size = 'md', children, ...props }) => {
  const sizes = {
    sm: {
      padding: 1,
      size: '16'
    },
    md: {
      padding: 2,
      size: '18'
    },
    lg: {
      padding: 3,
      size: '20'
    }
  }

  return (
    <Button
      {...props}
      size={size}
      sx={{ padding: sizes[size].padding, lineHeight: 1 }}>
      <Icon
        name={icon}
        size={sizes[size].size}
        sx={children ? { marginRight: 1 } : null}
      />
      {children}
    </Button>
  )
}
