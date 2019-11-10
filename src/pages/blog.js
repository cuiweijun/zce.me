/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card } from '../components'

export default ({ data }) => (
  <Layout
    title="Blog"
    description={`A collection of ${data.posts.totalCount} posts`}>
    <Container>
      <Row sx={{ marginBottom: 6 }}>
        {data.posts.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
    </Container>
  </Layout>
)

export const query = graphql`
  query BlogPage {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
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
