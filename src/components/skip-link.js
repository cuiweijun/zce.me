/**
 * Skip link
 */

import React from 'react'

export default ({ id = 'content', ...props }) => (
  <a
    {...props}
    href={`#${id}`}
    children="跳转到内容区"
    css={t => ({
      position: 'absolute',
      overrflow: 'hidden',
      width: 1,
      height: 1,
      margin: -1,
      padding: 0,
      top: -999,
      clip: 'rect(0 0 0 0)',
      ':focus': {
        position: 'fixed',
        zIndex: t.zIndices.tooltip,
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        margin: t.space[2],
        padding: t.space[3],
        fontWeight: t.fontWeights.bold,
        background: t.colors.background,
        clip: 'auto'
      }
    })}
  />
)
