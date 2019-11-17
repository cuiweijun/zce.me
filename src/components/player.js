/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { loadStyle, loadScript } from '../utils/load'

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
  const container = useRef(null)

  if (typeof sources === 'string') {
    sources = [{ src: sources }]
  }

  useEffect(() => {
    const initPlayer = () => {
      // TODO: need multi sources?
      const player = new window.Plyr(container.current, { autoplay })
      player.source = { type: Tag, title, sources, poster }
      player.on('ended', onEnded)
    }

    if (window.Plyr) return initPlayer()

    loadStyle('/css/plyr.css')
      .then(() => loadScript('https://cdn.plyr.io/3.5.6/plyr.js'))
      .then(initPlayer)

    // TODO: destory scripts
  }, [Tag, title, sources, poster, autoplay, onEnded])

  return <Tag {...props} ref={container} />
}
