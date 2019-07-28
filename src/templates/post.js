import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import moment from 'moment'

import Layout from '../components/layout'

export default ({ data, pageContext, location }) => {
  const { markdownRemark: post } = data
  const { fields } = post
  const { prev, next } = pageContext

  return (
    <Layout
      title={fields.title}
      description={fields.description || post.excerpt}
      cover={fields.cover}
      heading={
        <div className="container">
          <small className="post-meta">
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
          </small>
          <h1>{fields.title}</h1>
          <span aria-label="Posted on">
            {fields.categories.map(i => (
              <Link key={i.id} to={i.fields.permalink}>
                {i.id}
              </Link>
            ))}
          </span>
        </div>
      }
      bodyClass="post"
      location={location}>
      <div class="container">
        {fields.cover && (
          <Image
            alt={fields.title}
            title={fields.title}
            fluid={fields.cover.childImageSharp.fluid}
            style={{}}
            imgStyle={{}}
          />
        )}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          {fields.tags && (
            <ul>
              {fields.tags.map(tag => (
                <li key={tag.id}>
                  <Link to={tag.fields.permalink}>{tag.id}</Link>,
                </li>
              ))}
            </ul>
          )}
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
      </div>
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
          ...SiteCoverImage
        }
        description
        permalink
        authors {
          id
          fields {
            permalink
          }
        }
        categories {
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
