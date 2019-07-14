import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import moment from 'moment'

import Layout from '../components/layout'
import { colors, options, rhythm, scale } from '../styles'

export default ({ data, pageContext, location }) => {
  const { markdownRemark: post } = data
  const { fields } = post
  const { prev, next } = pageContext

  const postHeader = (
    <header style={{ color: colors.muted, textAlign: 'center' }}>
      <p
        style={{
          ...scale(-1 / 5),
          marginBottom: rhythm(0.25),
          textTransform: 'uppercase'
        }}>
        <span aria-label="Posted by">
          {fields.authors.map(i => (
            <Link key={i.id} to={i.fields.permalink}>
              {i.id}
            </Link>
          ))}
        </span>
        <span role="separator" aria-hidden="true">
          {' '}
          /{' '}
        </span>
        <time dateTime={fields.date} aria-label="Posted on">
          {moment.utc(fields.date).format('MMMM Do, YYYY')}
        </time>
      </p>
      <h1 style={{ fontWeight: options.boldWeight }}>{fields.title}</h1>
    </header>
  )

  const postCover = fields.cover && (
    <Image
      Tag="figure"
      alt={fields.title}
      title={fields.title}
      fixed={fields.cover.childImageSharp.fixed}
      style={{
        alignSelf: 'center',
        margin: `0 -10vw ${rhythm(1)}`,
        borderRadius: rhythm(0.25),
        maxWidth: '100vw'
      }}
      imgStyle={{}}
    />
  )

  const postMain = (
    <main>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
      <section>
        {fields.tags && (
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              listStyle: `none`,
              padding: 0
            }}>
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
      <hr style={{ marginBottom: rhythm(1) }} />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0
        }}>
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
      <article
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
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
        description
        date
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
        cover {
          childImageSharp {
            fixed(width: 1024) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
