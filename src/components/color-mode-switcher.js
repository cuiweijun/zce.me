/**
 * Color mode switcher
 */

import React from 'react'
import { useTheme } from '@emotion/react'

import Button from './button'

export default () => {
  const { mode, setMode } = useTheme()
  const isDark = mode === 'dark'
  const title = `切换至${isDark ? '「亮色」' : '「暗色」'}模式`
  const toggle = () => setMode(isDark ? 'default' : 'dark')

  const icon = (
    <span
      css={{
        display: 'block',
        position: 'relative',
        width: 24,
        height: 24,
        borderRadius: 99,
        boxShadow: isDark ? 'none' : 'inset 8px -8px 0px 0px currentColor',
        background: isDark ? 'currentColor' : 'transparent',
        transform: isDark ? 'scale(0.425)' : 'scale(0.8)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        willChange: 'transform',
        ':after': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-4px 0 0 -4px',
          borderRadius: 99,
          width: 8,
          height: 8,
          content: '""',
          boxShadow: `0 -23px 0 currentColor,
            0 23px 0 currentColor,
            23px 0 0 currentColor,
            -23px 0 0 currentColor,
            15px 15px 0 currentColor,
            -15px 15px 0 currentColor,
            15px -15px 0 currentColor,
            -15px -15px 0 currentColor`,
          transform: isDark ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.3s',
          willChange: 'transform'
        }
      }}
    />
  )

  return (
    <Button
      color="transparent"
      size="sm"
      icon={icon}
      title={title}
      aria-label={title}
      onClick={toggle}
      css={t => ({
        color: t.colors.muted,
        // transform: 'scale(0.75)',
        ':hover': { color: t.colors.muted }
      })}
    />
  )
}
