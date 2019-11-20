// ref: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-autolink-headers/src/gatsby-ssr.js

import React from 'react'

const defaults = {
  className: 'anchor',
  icon: true,
  offsetY: 10
}

export const onRenderBody = ({ setHeadComponents }, options) => {
  const { className, icon, offsetY } = Object.assign(defaults, options)

  // const style = `
  //   .${className} {
  //     float: left;
  //     padding-right: 4px;
  //     margin-left: -20px;
  //   }
  //   h1 .${className} svg,
  //   h2 .${className} svg,
  //   h3 .${className} svg,
  //   h4 .${className} svg,
  //   h5 .${className} svg,
  //   h6 .${className} svg {
  //     visibility: hidden;
  //   }
  //   h1:hover .${className} svg,
  //   h2:hover .${className} svg,
  //   h3:hover .${className} svg,
  //   h4:hover .${className} svg,
  //   h5:hover .${className} svg,
  //   h6:hover .${className} svg,
  //   h1 .${className}:focus svg,
  //   h2 .${className}:focus svg,
  //   h3 .${className}:focus svg,
  //   h4 .${className}:focus svg,
  //   h5 .${className}:focus svg,
  //   h6 .${className}:focus svg {
  //     visibility: visible;
  //   }
  // `

  // prettier-ignore
  const style = `.${className}{float:left;padding-right:4px;margin-left:-20px}h1 .${className} svg,h2 .${className} svg,h3 .${className} svg,h4 .${className} svg,h5 .${className} svg,h6 .${className} svg{visibility:hidden}h1 .${className}:focus svg,h1:hover .${className} svg,h2 .${className}:focus svg,h2:hover .${className} svg,h3 .${className}:focus svg,h3:hover .${className} svg,h4 .${className}:focus svg,h4:hover .${className} svg,h5 .${className}:focus svg,h5:hover .${className} svg,h6 .${className}:focus svg,h6:hover .${className} svg{visibility:visible}`

  // const script = `
  //   document.addEventListener("DOMContentLoaded", function(event) {
  //     var hash = window.decodeURI(location.hash.substr(1))
  //     if (!hash) return
  //     var element = document.getElementById(hash)
  //     if (!element) return
  //     // Wait for the browser to finish rendering before scrolling.
  //     setTimeout(function () {
  //       window.scrollTo(0, element.offsetTop - ${offsetY})
  //     }, 0)
  //   })
  // `

  // prettier-ignore
  const script = `document.addEventListener("DOMContentLoaded",function(e){var o=window.decodeURI(location.hash.substr(1));if(o){var t=document.getElementById(o);t&&setTimeout(function(){window.scrollTo(0,t.offsetTop-${offsetY})},0)}});`

  return setHeadComponents([
    icon ? <style key="autolink-headers-style" children={style} /> : undefined,
    <script
      key="autolink-headers-script"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  ])
}
