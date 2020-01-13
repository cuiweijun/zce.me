import React from 'react'

// for prevent flashing
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents(
    <script
      key="gatsby-plugin-analytics"
      src={`https://hm.baidu.com/hm.js?${process.env.BAIDU_ID}`}
    />
  )
}
