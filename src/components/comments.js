import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

export default ({ className, url, id, title }) => (
  <section className={className}>
    <DiscussionEmbed
      shortname={'zce-sandbox'}
      config={{
        url: url,
        identifier: id,
        title: title
      }}
    />
  </section>
)
