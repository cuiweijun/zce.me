/** @jsx jsx */
import { jsx } from 'theme-ui'

import Icon from './icon'
import { darken, readable } from '../utils/color'

export default ({
  as: Tag = 'button',
  variant = 'base',
  size = 'md',
  color = 'primary',
  icon = null,
  children,
  ...props
}) => {
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
      px: 3,
      py: 2,
      borderRadius: 'medium',
      fontSize: 'lg'
    }
  }

  const variants = {
    outline: {
      bg: 'transparent',
      color: color // readable('background', 'white', 'dark')
    },
    ghost: {
      borderColor: 'transparent',
      bg: 'transparent',
      color: color // readable('background', 'white', 'dark')
    },
    pill: {
      borderRadius: 'pill'
    },
    elevated: {
      borderColor: darken(color, 0.1),
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)'
    }
  }

  const mixins = { ...sizes[size], ...variants[variant] }

  if (icon) {
    const iconSizes = { sm: 16, md: 18, lg: 22 }
    icon = (
      <Icon
        name={icon}
        size={iconSizes[size]}
        sx={children ? { mr: 1 } : null}
      />
    )

    if (!children) {
      mixins.px = mixins.py
      mixins.lineHeight = 'solid'
    }
  }

  return (
    <Tag
      {...props}
      sx={{
        appearance: 'none',
        display: 'inline-block',
        m: 0,
        px: 3,
        py: 2,
        border: 1,
        borderColor: color, // 'border',
        borderRadius: 'medium',
        bg: color, // 'transparent',
        color: readable(color, 'white', 'dark'), // 'text',
        textAlign: 'center',
        lineHeight: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':hover': {
          borderColor: darken(color, 0.05), // 'border',
          bg: darken(color, 0.05), // 'background',
          color: readable(color, 'white', 'dark'), // 'white',
          textDecoration: 'none'
        },
        ':active': {
          borderColor: darken(color, 0.15), // 'transparent',
          bg: darken(color, 0.15), // darken('background', 0.11),
          color: readable(color, 'white', 'dark') // 'white'
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
      }}>
      {icon}
      {children}
    </Tag>
  )
}
