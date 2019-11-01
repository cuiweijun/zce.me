import React, { useEffect, useRef } from 'react'
import { navigate } from 'gatsby'
import 'plyr/dist/plyr.css'

import { Layout } from '../components'

export default ({ location }) => {
  const playerEl = useRef(null)

  useEffect(() => {
    import('hls.js')
      .then(m => {
        const hls = new m.default()
        hls.loadSource(
          'https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/dac9f5465285890795319388797/v.f240.m3u8'
        )
        hls.attachMedia(playerEl.current)
        return import('plyr')
      })
      .then(m => {
        const player = new m.default(playerEl.current)
        player.on('ended', e => {
          navigate('/')
        })
      })
  })

  return (
    <Layout
      className="test"
      title="Test"
      cover={false}
      header={false}
      location={location}>
      <video ref={playerEl} style={{ maxHeight: 'calc(100vh - 3rem)' }} />
    </Layout>
  )
}
