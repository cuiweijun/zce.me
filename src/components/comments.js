/**
 * Comments
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { graphql, useStaticQuery, withAssetPrefix } from 'gatsby'

import { loadStyle, loadScript } from '../utils'

if (typeof window !== 'undefined') {
  window.React = React
  window.ReactDOM = ReactDOM
}

const query = graphql`
  query CommentsComponent {
    meta: config {
      url
    }
  }
`

const options = {
  clientID: '2367eeb15ce3e258f8fe',
  clientSecret: '667c3ba09968991380c7aba4c19ad3359e714dd0',
  repo: 'comments',
  owner: 'zce',
  admin: ['zce'],
  distractionFreeMode: false // Facebook-like distraction free mode
}

export default ({ type, slug, title, excerpt, permalink, ...props }) => {
  const { meta } = useStaticQuery(query)
  const container = React.useRef(null)

  if (type) {
    options.labels = ['comments', type]
  }

  if (slug) {
    options.id = slug
  }

  if (title) {
    options.title = title
  }

  if (permalink) {
    options.body = `
    ${excerpt || 'none'}\n\n**Permalink**: ${meta.url}${permalink}
    `.trim()
  }

  React.useEffect(() => {
    const initGitalk = () => {
      const gitalk = new window.Gitalk(options)
      container.current && gitalk.render(container.current)
    }

    if (window.Gitalk) return initGitalk()

    Promise.all([
      loadStyle(withAssetPrefix('/assets/gitalk.css')),
      loadScript(withAssetPrefix('/assets/gitalk.js'))
    ]).then(initGitalk)

    // TODO: destory scripts
    // https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/
  }, [])

  return <div {...props} ref={container} />
}

// TODO: Own Comment System
// ref: https://www.taniarascia.com/add-comments-to-static-site/

// return (
//   <form className="comment" name="comments" data-netlify="true" data-netlify-honeypot="bot-field">
//     <input type="hidden" name="form-name" value="comments" />
//     <input type="hidden" name="url" value={url}/>
//     <input type="hidden" name="slug" value={slug}/>
//     <input type="hidden" name="title" value={title}/>
//     <fieldset className="comment-name">
//       <label htmlFor="name">Your name</label>
//       <input type="text" name="name" placeholder="Your name" />
//     </fieldset>
//     <fieldset className="comment-email">
//       <label htmlFor="email">Your email</label>
//       <input type="email" name="email" placeholder="Your email" />
//     </fieldset>
//     <fieldset className="comment-content">
//       <label htmlFor="content">Your comment</label>
//       <textarea name="content" placeholder="Your comment (Markdown is fine)"></textarea>
//     </fieldset>
//   </form>
// )
