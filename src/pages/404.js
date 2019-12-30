import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card, Button, Link } from '../components'

export default ({ data: { posts } }) => (
  <Layout
    title="404 Not found"
    hero={
      <Container
        sx={{
          py: '12vw',
          textAlign: 'center',
          color: 'white',
          textShadow: 'text'
          // TODO: transition
          // transition: 'padding 0.3s, color 0.3s'
        }}>
        <h1 sx={{ fontSize: '8rem' }}>404</h1>
        <p sx={{ fontSize: 'xl', mb: 6 }}>Page not found</p>
        <Button as={Link} to="/">
          Back to Home &rarr;
        </Button>
      </Container>
    }>
    <Container>
      <Row sx={{ mb: 6 }}>
        {posts.nodes.map(node => (
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
