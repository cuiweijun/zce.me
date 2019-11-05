import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Layout, Comments } from '../components'

export default ({ data, location }) => {
  const { siteMetadata, page } = data
  const { fields } = page
  const url = siteMetadata.url + location.pathname

  return (
    <Layout
      className={`page ${fields.slug}`}
      title={fields.title}
      description={fields.description || page.excerpt}
      cover={false}
      header={
        <div className="container">
          <h1>{fields.title}</h1>
          {fields.description && <p>{fields.description}</p>}
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
      {fields.comment && (
        <section className="page-comments container">
          <Comments url={url} slug={fields.slug} title={fields.title} />
        </section>
      )}
    </Layout>
  )
}

export const query = graphql`
  query PageTemplate($id: String!) {
    siteMetadata: config {
      url
    }
    page: markdownRemark(id: { eq: $id }) {
      fields {
        title
        slug
        cover {
          ...SiteCoverImage
        }
        description
        comment
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
