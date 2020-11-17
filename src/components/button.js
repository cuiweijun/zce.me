/**
 * Button
 */

import React from 'react'
import { darken, getLuminance } from 'polished'
import { useTheme } from '@emotion/react'

import Icon from './icon'

const readable = (c, l, d) => (getLuminance(c) > 0.4 ? d : l)

export default ({
  as: Tag = 'button',
  variant = 'base',
  size = 'md',
  color = 'primary',
  icon = null,
  children,
  ...props
}) => {
  const t = useTheme()

  color = t.colors[color] || color

  const sizes = {
    sm: {
      padding: `${t.space[1]} ${t.space[2]}`,
      borderRadius: t.radii.small,
      fontSize: t.fontSizes.sm
    },
    md: {
      padding: `${t.space[2]} ${t.space[3]}`,
      borderRadius: t.radii.medium,
      fontSize: t.fontSizes.md
    },
    lg: {
      padding: `${t.space[2]} ${t.space[3]}`,
      borderRadius: t.radii.medium,
      fontSize: t.fontSizes.lg
    }
  }

  const variants = {
    outline: {
      background: 'transparent',
      color: color
    },
    ghost: {
      borderColor: 'transparent',
      background: 'transparent',
      color: color
    },
    pill: {
      borderRadius: t.radii.pill
    },
    elevated: {
      borderColor: darken(0.1, color),
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)'
    }
  }

  const mixins = { ...sizes[size], ...variants[variant] }

  if (icon) {
    const iconSizes = { sm: 16, md: 18, lg: 22 }
    icon =
      typeof icon !== 'string' ? (
        icon
      ) : (
        <Icon
          name={icon}
          size={iconSizes[size]}
          css={children && (t => ({ marginRight: t.space[1] }))}
        />
      )

    if (!children) {
      mixins.padding = mixins.padding.split(' ')[0]
      mixins.lineHeight = 'solid'
    }
  }

  return (
    <Tag
      {...props}
      css={{
        appearance: 'none',
        display: 'inline-block',
        margin: 0,
        padding: `${t.space[2]} ${t.space[3]}`,
        border: `1px solid ${t.colors.border}`,
        borderColor: color,
        borderRadius: t.radii.medium,
        background: color,
        color: readable(color, '#fff', t.colors.dark),
        fontSize: 'inherit',
        fontWeight: t.fontWeights.bold,
        lineHeight: 'inherit',
        textAlign: 'center',
        textDecoration: 'none',
        textShadow: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':hover': {
          borderColor: darken(0.05, color),
          background: darken(0.05, color),
          color: readable(color, '#fff', t.colors.dark),
          textDecoration: 'none'
        },
        ':active': {
          borderColor: darken(0.15, color),
          background: darken(0.15, color),
          color: readable(color, '#fff', t.colors.dark)
        },
        ':focus': {
          boxShadow: 'outline',
          outline: 0
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'default'
        },
        ...mixins
      }}
    >
      {icon}
      {children}
    </Tag>
  )
}
