import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Avatar, Hero, Cover, Card } from '../components'
import { getMeta } from '../utils'

export default ({ data: { author, posts } }) => (
  <Layout
    title={getMeta(author.meta, 'title', author.name)}
    description={getMeta(author.meta, 'description', author.bio)}
    keywords={getMeta(author.meta, 'keywords')}
  >
    <Cover image={author.cover} />
    <Hero>
      <Avatar
        size={160}
        name={author.name}
        image={author.avatar}
        css={t => ({ marginBottom: t.space[3], boxShadow: t.shadows.light })}
      />
      <h1>{author.name}</h1>
      <p>{author.bio || `包含 ${posts.totalCount} 个内容`}</p>
    </Hero>
    <Container row css={t => ({ marginBottom: t.space[6] })}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
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
