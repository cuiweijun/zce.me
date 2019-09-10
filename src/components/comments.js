import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

export default ({ className, url, slug, title }) => (
  <section className={className}>
    <DiscussionEmbed
      shortname="zce-sandbox"
      config={{
        url: url,
        identifier: slug,
        title: title
      }}
    />
    {/* <form className="comment" name="comments" data-netlify={true}>
      <input type="hidden" name="url" value={url}/>
      <input type="hidden" name="slug" value={slug}/>
      <input type="hidden" name="title" value={title}/>
      <fieldset className="comment-name">
        <label htmlFor="name">Your name</label>
        <input type="text" name="name" placeholder="Your name" />
      </fieldset>
      <fieldset className="comment-email">
        <label htmlFor="email">Your email</label>
        <input type="email" name="email" placeholder="Your email" />
      </fieldset>
      <fieldset className="comment-content">
        <label htmlFor="content">Your comment</label>
        <textarea name="content" placeholder="Your comment (Markdown is fine)"></textarea>
      </fieldset>
    </form> */}
  </section>
)
