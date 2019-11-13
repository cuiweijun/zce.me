/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ variant = 'default', size = 'md', ...props }) => {
  const sizes = {
    sm: {
      paddingX: 2,
      paddingY: 1,
      borderRadius: 'small',
      fontSize: 'sm'
    },
    md: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 'medium',
      fontSize: 'md'
    },
    lg: {
      paddingX: 4,
      paddingY: 2,
      borderRadius: 'medium',
      fontSize: 'lg'
    }
  }

  const mixins = sizes[size]

  return (
    <input
      {...props}
      sx={{
        appearance: 'none',
        display: 'inline-block',
        margin: 0,
        paddingX: 3,
        paddingY: 2,
        border: 'default',
        borderColor: 'border',
        borderRadius: 'medium',
        backgroundColor: 'transparent',
        color: 'text',
        lineHeight: 'inherit',
        fontSize: 'inherit',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':focus': {
          boxShadow: 'outline',
          outline: 0
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'default'
        },
        // pass variant prop to sx
        variant: `variants.inputs.${variant}`,
        ...mixins
      }}
    />
  )
}
