import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data, pageContext, location }) => {
  const { markdownRemark: post } = data
  const { fields } = post

  return (
    <Layout
      title={fields.title}
      description={fields.description || post.excerpt}
      cover={fields.cover || undefined}
      heading={false}
      bodyClass="post"
      location={location}>
      <article className="container" role="main">
        <header className="post-header">
          <h1>{fields.title}</h1>
        </header>
        {fields.cover && (
          <Image
            Tag="figure"
            className="post-cover"
            alt={fields.title}
            title={fields.title}
            fluid={fields.cover.childImageSharp.fluid}
          />
        )}
        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        title
        cover {
          ...SiteCoverImage
        }
        description
        permalink
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
