/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card } from '../components'

export default ({ data: { term, posts } }) => (
  <Layout
    title={(term.meta && term.meta.title) || term.name}
    description={(term.meta && term.meta.description) || term.description}
    keywords={term.meta && term.meta.keywords}
    subtitle={`A collection of ${posts.totalCount} posts`}
    cover={term.cover}>
    <Container>
      <Row sx={{ marginBottom: 6 }}>
        {posts.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
    </Container>
  </Layout>
)

export const query = graphql`
  query CategoryTemplate($id: String!) {
    term: category(id: { eq: $id }) {
      name
      slug
      description
      cover {
        ...CoverImage
      }
      meta {
        title
        description
      }
    }

    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { ne: "page" }
          draft: { eq: false }
          private: { eq: false }
          categories: { elemMatch: { id: { eq: $id } } }
        }
      }
      sort: { fields: fields___date, order: DESC }
    ) {
      totalCount
      nodes {
        ...Card
      }
    }
  }
`
