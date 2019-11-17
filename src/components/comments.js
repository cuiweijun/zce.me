/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import Gitalk from 'gitalk/dist/gitalk-component'

const query = graphql`
  query CommentsComponent {
    meta: config {
      url
    }
  }
`

const defaults = {
  clientID: '2367eeb15ce3e258f8fe',
  clientSecret: '667c3ba09968991380c7aba4c19ad3359e714dd0',
  repo: 'comments',
  owner: 'zce',
  admin: ['zce'],
  distractionFreeMode: false // Facebook-like distraction free mode
}

export default ({ id, title, excerpt, permalink }) => {
  const { meta } = useStaticQuery(query)

  const options = {}

  if (id) {
    options.id = id
  }

  if (title) {
    options.title = title
  }

  if (permalink) {
    options.body = `
    ${excerpt || 'none'}\n\n**Permalink**: ${meta.url}${permalink}
    `.trim()
  }

  return (
    <Fragment>
      <Helmet>
        {/* TODO: restyle */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/gitalk/dist/gitalk.css"
        />
      </Helmet>
      <Gitalk options={{ ...defaults, ...options }} />
    </Fragment>
  )
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
