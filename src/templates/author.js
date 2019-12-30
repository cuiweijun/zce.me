import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card, Avatar } from '../components'
import { getMeta } from '../utils'

export default ({ data: { author, posts } }) => (
  <Layout
    title={getMeta(author.meta, 'title') || author.name}
    description={getMeta(author.meta, 'description') || author.bio}
    keywords={getMeta(author.meta, 'keywords')}
    subtitle={author.bio || `包含 ${posts.totalCount} 个内容`}
    cover={author.cover}
    hero={
      <Container sx={{ py: '5vw', color: 'white', textAlign: 'center' }}>
        <Avatar
          name={author.name}
          image={author.avatar}
          sx={{ mb: 3, size: 160, boxShadow: 'light' }}
        />
        <h1>{author.name}</h1>
        <p sx={{ fontSize: 'xl' }}>{author.bio}</p>
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
  query AuthorTemplate($id: String!) {
    author(id: { eq: $id }) {
      name
      slug
      avatar {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cover {
        ...CoverImage
      }
      bio
      meta {
        key
        value
      }
    }

    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { ne: "page" }
          draft: { eq: false }
          private: { eq: false }
          authors: { elemMatch: { id: { eq: $id } } }
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
