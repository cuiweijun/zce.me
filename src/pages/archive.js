import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Hero, Cover, Card } from '../components'

export default ({ data: { posts } }) => (
  <Layout title="内容归档" description="所有内容归档">
    <Cover />
    <Hero title="归档" />
    <Container row sx={{ mb: 6 }}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query ArchivePage {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { ne: "page" }
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
