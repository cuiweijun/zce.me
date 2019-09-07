import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data, location }) => {
  const { post } = data
  const { fields } = post

  return (
    <Layout
      className="page"
      title={fields.title}
      description={fields.description || post.excerpt}
      cover={false}
      header={
        <div className="container">
          <h1>{fields.title}</h1>
        </div>
      }
      location={location}>
      {fields.cover && (
        <Image
          Tag="figure"
          className="page-cover container"
          alt={fields.title}
          title={fields.title}
          fluid={fields.cover.childImageSharp.fluid}
        />
      )}
      <section
        className="page-content container"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query PageTemplate($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
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
