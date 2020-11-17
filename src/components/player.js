/**
 * Media Player
 */

import React from 'react'

import { loadStyle, loadScript } from '../utils'

export default ({ source, autoplay, onEnded, ...props }) => {
  const container = React.useRef(null)

  React.useEffect(() => {
    // ___webpackCompilationHash
    const tasks = [
      loadStyle(`/assets/plyr.css?v=${process.env.GATSBY_STATIC_VERSION}`),
      loadScript(`/assets/plyr.js?v=${process.env.GATSBY_STATIC_VERSION}`)
    ]

    const isMp4 = source.slice(-4) !== '.mp4'

    isMp4 &&
      tasks.push(
        loadScript(`/assets/hls.js?v=${process.env.GATSBY_STATIC_VERSION}`)
      )

    Promise.all(tasks).then(() => {
      if (isMp4 && window.Hls.isSupported()) {
        const hls = new window.Hls()
        hls.loadSource(source)
        hls.attachMedia(container.current)
      } else {
        container.current.src = source
      }

      new window.Plyr(container.current, { autoplay }).on('ended', onEnded)
    })
  })

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video {...props} ref={container} />
}
