/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Container, Layout, Image, Comments } from '../components'

export default ({ data: { page } }) => (
  <Layout
    title={page.fields.title}
    subtitle={page.fields.description}
    description={page.fields.description || page.excerpt}
    cover={false}
    padding="5vw">
    <Container sx={{ mb: 9 }}>
      <Image
        Tag="figure"
        file={page.fields.cover}
        alt={page.fields.title}
        title={page.fields.title}
        sx={{ mb: 8 }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: page.html }}
        sx={{
          maxWidth: '50rem',
          mx: 'auto',
          lineHeight: 'loose',
          img: { display: 'block', mx: 'auto' }
        }}
      />
      {page.fields.comment && (
        <Comments
          type="page"
          slug={page.fields.slug}
          title={page.fields.title}
          excerpt={page.excerpt}
          permalink={page.fields.permalink}
          sx={{
            maxWidth: '50rem',
            mx: 'auto',
            lineHeight: 'loose',
            img: { display: 'block', mx: 'auto' }
          }}
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
