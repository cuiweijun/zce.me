/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card, Button, Link } from '../components'

export default ({ data }) => (
  <Layout
    title="404 Not found"
    hero={
      <Container
        sx={{
          paddingY: '12vw',
          textAlign: 'center',
          color: 'white',
          textShadow: 'medium',
          transition: 'padding 0.3s, color 0.3s'
        }}>
        <h1 sx={{ fontSize: '9rem' }}>404</h1>
        <p sx={{ fontSize: 'xl', marginBottom: 6 }}>Page not found</p>
        <Button as={Link} variant="outline" to="/" sx={{ color: 'white' }}>
          Back to Home &rarr;
        </Button>
      </Container>
    }>
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
  query NotFoundPage {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 3
    ) {
      totalCount
      nodes {
        ...Card
      }
    }
  }
`
