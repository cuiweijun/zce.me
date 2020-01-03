/**
 * Color mode switcher
 */

import React from 'react'

import Button from './button'
import { useThemeMode } from '../utils'

export default () => {
  const [mode, setMode] = useThemeMode()
  const isDark = mode === 'dark'
  const title = `切换至${isDark ? '「亮色」' : '「暗色」'}模式`
  const toggle = () => setMode(isDark ? 'default' : 'dark')

  const icon = (
    <span
      sx={{
        display: 'block',
        overflow: isDark ? 'visible' : 'hidden',
        position: 'relative',
        size: 24,
        borderRadius: 'circle',
        border: isDark ? '4px solid currentColor' : 0,
        boxShadow: isDark ? 'none' : 'inset 8px -8px 0px 0px currentColor',
        bg: isDark ? 'currentColor' : 'transparent',
        transform: isDark ? 'scale(0.55)' : 'scale(1)',
        transition: 'all 0.35s',
        ':before': {
          position: 'absolute',
          right: '-9px',
          top: '-9px',
          size: 24,
          border: isDark ? '2px solid currentColor' : 0,
          borderRadius: 'circle',
          content: '""',
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'translate(14px, -14px)' : 'translate(0, 0)',
          transition: 'transform 0.35s'
        },
        ':after': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-4px 0 0 -4px',
          borderRadius: 'circle',
          size: 8,
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
          transition: 'all 0.35s'
        }
      }}
    />
  )

  return (
    <Button
      color="transparent"
      icon={icon}
      title={title}
      aria-label={title}
      onClick={toggle}
      sx={{
        color: 'muted',
        transform: 'scale(0.75)',
        ':hover': { color: 'muted' }
      }}
    />
  )
}
