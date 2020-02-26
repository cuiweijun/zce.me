import React from 'react'

export const onRenderBody = ({ setPostBodyComponents }) => {
  // Don't track while developing.
  if (process.env.NODE_ENV !== 'production') return

  setPostBodyComponents(
    <script
      key="gatsby-plugin-analytics"
      src={`https://hm.baidu.com/hm.js?${process.env.GATSBY_ANALYTICS_ID}`}
    />
  )
}
