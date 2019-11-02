import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Layout } from '../components'

export default ({ data, location }) => {
  const { page } = data
  const { fields } = page

  return (
    <Layout
      className={`page ${fields.slug}`}
      title={fields.title}
      description={fields.description || page.excerpt}
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
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query PageTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        title
        slug
        cover {
          ...SiteCoverImage
        }
        description
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
