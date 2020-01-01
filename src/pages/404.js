import React from 'react'
import { graphql } from 'gatsby'

import {
  Layout,
  Container,
  Button,
  Link,
  Hero,
  Cover,
  Card
} from '../components'

export default ({ data: { posts } }) => (
  <Layout title="404 Not found">
    <Cover type={3} />
    <Hero sx={{ py: '12vw' }}>
      <h1 sx={{ fontSize: '8rem', fontWeight: 'light' }}>404</h1>
      <p sx={{ mb: 6 }}>你似乎来到了新大陆～</p>
      <Button as={Link} to="/">
        返回首页 <span aria-hidden="true">&rarr;</span>
      </Button>
    </Hero>
    <Container row sx={{ mb: 6 }}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
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
