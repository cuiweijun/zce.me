/**
 * Input
 */

import React from 'react'
import { useTheme } from '@emotion/react'

export default ({ variant = 'default', size = 'md', ...props }) => {
  const t = useTheme()

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
      padding: `${t.space[2]} ${t.space[4]}`,
      borderRadius: t.radii.medium,
      fontSize: t.fontSizes.lg
    }
  }

  return (
    <input
      {...props}
      css={{
        appearance: 'none',
        display: 'inline-block',
        margin: 0,
        padding: `${t.space[2]} ${t.space[3]}`,
        border: `1px solid ${t.colors.border}`,
        borderRadius: t.radii.medium,
        background: 'transparent',
        color: t.colors.text,
        lineHeight: 'inherit',
        fontSize: 'inherit',
        transition: 'border 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s',
        ':focus': {
          boxShadow: t.shadows.outline,
          borderColor: t.colors.primary,
          outline: 0
        },
        '&:disabled': {
          opacity: 0.5,
          cursor: 'default'
        },
        ...sizes[size]
      }}
    />
  )
}
