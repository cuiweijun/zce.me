/**
 * Media Player
 */

import React from 'react'
import { withAssetPrefix } from 'gatsby'

import { loadStyle, loadScript } from '../utils/loader'

// TODO: Hls support
// ref: https://github.com/video-dev/hls.js
// 'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/dac9f5465285890795319388797/v.f240.m3u8'
// const hls = new Hls()
// hls.loadSource(src)
// hls.attachMedia(playerEl.current)

export default ({
  type: Tag = 'video',
  title,
  sources,
  poster,
  autoplay,
  onEnded,
  ...props
}) => {
  const container = React.useRef(null)

  if (typeof sources === 'string') {
    sources = [{ src: sources }]
  }

  React.useEffect(() => {
    const initPlayer = () => {
      // TODO: need multi sources?
      const player = new window.Plyr(container.current, { autoplay })
      player.source = { type: Tag, title, sources, poster }
      // to support css-in-js
      if (player.media && player.elements.original) {
        player.media.className = player.elements.original.className
      }
      player.on('ended', onEnded)
    }

    if (window.Plyr) return initPlayer()

    Promise.all([
      loadStyle(withAssetPrefix('/assets/plyr.css')),
      loadScript(withAssetPrefix('/assets/plyr.js'))
    ]).then(initPlayer)

    // TODO: destory scripts
  }, [Tag, title, sources, poster, autoplay, onEnded])

  return <Tag {...props} ref={container} />
}
