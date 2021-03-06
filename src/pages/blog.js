import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Hero, Cover, Card } from '../components'

export default ({ data: { posts } }) => (
  <Layout title="博客">
    <Cover />
    <Hero title="博客" subtitle={`共有 ${posts.totalCount} 篇文章`} />
    <Container row css={t => ({ marginBottom: t.space[6] })}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
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
