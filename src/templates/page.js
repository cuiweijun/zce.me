import React from 'react'
import { graphql } from 'gatsby'

import { Container, Layout, Image, Hero, Comments } from '../components'

export default ({
  data: {
    page: { fields, excerpt, html }
  }
}) => (
  <Layout title={fields.title} description={fields.description || excerpt}>
    <Hero title={fields.title} subtitle={fields.description} />
    <Container>
      <Image
        Tag="figure"
        file={fields.cover}
        alt={fields.title}
        title={fields.title}
        sx={{ mx: [-3, 0], mb: '6vw' }}
      />
      {html && (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          sx={{
            maxWidth: 'inner',
            mx: 'auto',
            mb: '8vw',
            lineHeight: 'loose',
            img: { display: 'block', mx: 'auto' }
          }}
        />
      )}
      {fields.comment && (
        <Comments
          type="page"
          slug={fields.slug}
          title={fields.title}
          excerpt={excerpt}
          permalink={fields.permalink}
          sx={{ maxWidth: 'inner', mx: 'auto', mb: '8vw' }}
        />
      )}
    </Container>
  </Layout>
)

export const query = graphql`
  query PageTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        title
        slug
        cover {
          ...CoverImage
        }
        description
        permalink
        comment
      }
      excerpt(pruneLength: 160, truncate: true)
      html
    }
  }
`
