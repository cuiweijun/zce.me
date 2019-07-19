import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import moment from 'moment'

import Layout from '../components/layout'

export default ({ data, pageContext, location }) => {
  const { markdownRemark: post } = data
  const { fields } = post
  const { prev, next } = pageContext

  const postHeader = (
    <header>
      <p>
        <span aria-label="Posted by">
          {fields.authors.map(i => (
            <Link key={i.id} to={i.fields.permalink}>
              {i.id}
            </Link>
          ))}
        </span>
        <span role="separator" aria-hidden="true"></span>
        <time dateTime={fields.date} aria-label="Posted on">
          {moment.utc(fields.date).format('MMMM Do, YYYY')}
        </time>
      </p>
      <h1>{fields.title}</h1>
    </header>
  )

  const postCover = fields.cover && (
    <Image
      Tag="figure"
      alt={fields.title}
      title={fields.title}
      fixed={fields.cover.childImageSharp.fixed}
      style={{}}
      imgStyle={{}}
    />
  )

  const postMain = (
    <main>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
      <section>
        {fields.tags && (
          <ul>
            {fields.tags.map(tag => (
              <li key={tag.id}>
                <Link to={tag.fields.permalink}>{tag.id}</Link>,
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )

  const postFooter = (
    <footer>
      <hr />
      <ul>
        <li>
          {prev && (
            <Link to={prev.fields.permalink} rel="prev">
              ← {prev.fields.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.permalink} rel="next">
              {next.fields.title} →
            </Link>
          )}
        </li>
      </ul>
      <Link to="/blog/">Back to all Posts</Link>
    </footer>
  )

  return (
    <Layout
      title={fields.title}
      description={fields.description || post.excerpt}
      location={location}>
      <article>
        {postHeader}
        {postCover}
        {postMain}
        {postFooter}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        title
        date
        updated
        cover {
          childImageSharp {
            fixed(width: 1024) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        description
        permalink
        authors {
          id
          fields {
            permalink
          }
        }
        tags {
          id
          fields {
            permalink
          }
        }
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
