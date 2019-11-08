/** @jsx jsx */
import { jsx } from 'theme-ui'
import { darken } from '@theme-ui/color'

export default ({
  as: Tag = 'button',
  variant = 'default',
  size = 'md',
  ...props
}) => {
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
    <Tag
      {...props}
      sx={{
        // appearance: 'none',
        display: 'inline-block',
        margin: 0,
        // paddingX: 3,
        // paddingY: 2,
        border: 'default',
        borderColor: darken('background', 0.16),
        // borderRadius: 'medium',
        backgroundColor: 'background',
        color: 'text',
        textAlign: 'center',
        lineHeight: 'inherit',
        textDecoration: 'none',
        // fontSize: 'inherit',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: darken('background', 0.1),
          color: 'text',
          textDecoration: 'none'
        },
        ':active': {
          borderColor: 'transparent',
          backgroundColor: darken('background', 0.15),
          color: 'text'
        },
        ':focus': {
          boxShadow: 'outline',
          outline: 0
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'default'
        },
        // pass variant prop to sx
        variant: `variants.buttons.${variant}`,
        ...mixins
      }}
    />
  )
}
