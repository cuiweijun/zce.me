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
        css={t => ({ margin: `0 -${t.space[3]} 6vw` })}
      />
      {html && (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          css={t => ({
            maxWidth: t.sizes.inner,
            margin: '0 auto 8vw',
            lineHeight: t.lineHeights.loose,
            img: { display: 'block', margin: '0 auto' }
          })}
        />
      )}
      {fields.comment && (
        <Comments
          type="page"
          slug={fields.slug}
          title={fields.title}
          excerpt={excerpt}
          permalink={fields.permalink}
          css={t => ({ maxWidth: t.sizes.inner, margin: '0 auto 8vw' })}
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
