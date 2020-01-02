/**
 * Button
 */

import React from 'react'

import Icon from './icon'
import { darken, readable } from '../theme'

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
      color: color
    },
    ghost: {
      borderColor: 'transparent',
      bg: 'transparent',
      color: color
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
    icon =
      typeof icon === 'string' ? (
        <Icon
          name={icon}
          size={iconSizes[size]}
          sx={children ? { mr: 1 } : null}
        />
      ) : (
        icon
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
        borderColor: color,
        borderRadius: 'medium',
        bg: color,
        color: readable(color, 'white', 'dark'),
        fontSize: 'inherit',
        fontWeight: 'bold',
        lineHeight: 'inherit',
        textAlign: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':hover': {
          borderColor: darken(color, 0.05),
          bg: darken(color, 0.05),
          color: readable(color, 'white', 'dark'),
          textDecoration: 'none'
        },
        ':active': {
          borderColor: darken(color, 0.15),
          bg: darken(color, 0.15),
          color: readable(color, 'white', 'dark')
        },
        ':focus': {
          boxShadow: 'outline',
          outline: 0
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'default'
        },
        // // pass variant prop to sx
        // variant: `variants.buttons.${variant}`,
        ...mixins
      }}>
      {icon}
      {children}
    </Tag>
  )
}
