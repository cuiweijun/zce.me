/**
 * Input
 */

import React from 'react'

export default ({ variant = 'default', size = 'md', ...props }) => {
  const sizes = {
    sm: {
      px: 2,
      py: 1,
      borderRadius: 'small',
      fontSize: 'sm'
    },
    md: {
      px: 3,
      py: 2,
      borderRadius: 'medium',
      fontSize: 'md'
    },
    lg: {
      px: 4,
      py: 2,
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
        m: 0,
        px: 3,
        py: 2,
        border: 1,
        borderRadius: 'medium',
        bg: 'transparent',
        color: 'text',
        lineHeight: 'inherit',
        fontSize: 'inherit',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':focus': {
          boxShadow: 'outline',
          borderColor: 'primary',
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
