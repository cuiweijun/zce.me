/**
 * Media Player
 */

import React from 'react'

import { loadStyle, loadScript } from '../utils'

export default ({ source, autoplay, onEnded, ...props }) => {
  const container = React.useRef(null)

  React.useEffect(() => {
    const initPlayer = () => {
      if (source.substr(-4) !== '.mp4' && window.Hls.isSupported()) {
        const hls = new window.Hls()
        hls.loadSource(source)
        hls.attachMedia(container.current)
      } else {
        container.current.src = source
      }

      new window.Plyr(container.current, { autoplay }).on('ended', onEnded)
    }

    // ___webpackCompilationHash
    Promise.all([
      loadStyle(`/assets/plyr.css?v=${process.env.STATIC_VERSION}`),
      loadScript(`/assets/plyr.js?v=${process.env.STATIC_VERSION}`),
      loadScript(`/assets/hls.js?v=${process.env.STATIC_VERSION}`)
    ]).then(initPlayer)
  })

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video {...props} ref={container} />
}

// export default ({
//   type: Tag = 'video',
//   title,
//   sources,
//   poster,
//   autoplay,
//   onEnded,
//   ...props
// }) => {
//   const container = React.useRef(null)

//   if (typeof sources === 'string') {
//     sources = [{ src: sources }]
//   }

//   React.useEffect(() => {
//     const initPlayer = () => {
//       // TODO: need multi sources?
//       const player = new window.Plyr(container.current, { autoplay })
//       player.source = { type: Tag, title, sources, poster }
//       // to support css-in-js
//       if (player.media && player.elements.original) {
//         player.media.className = player.elements.original.className
//       }
//       player.on('ended', onEnded)
//     }

//     if (window.Plyr) return initPlayer()

//     // ___webpackCompilationHash
//     Promise.all([
//       loadStyle(withAssetPrefix('/assets/plyr.css?v=20200101')),
//       loadScript(withAssetPrefix('/assets/plyr.js?v=20200101'))
//     ]).then(initPlayer)

//     // TODO: destory scripts
//   }, [Tag, title, sources, poster, autoplay, onEnded])

//   return <Tag {...props} ref={container} />
// }
