import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Hero, Cover, Card } from '../components'
import { getMeta } from '../utils'

export default ({ data: { term, posts } }) => (
  <Layout
    title={getMeta(term.meta, 'title', term.name)}
    description={getMeta(term.meta, 'description', term.description)}
    keywords={getMeta(term.meta, 'keywords')}
  >
    <Cover image={term.cover} />
    <Hero
      title={term.name}
      subtitle={term.description || `包含 ${posts.totalCount} 个内容`}
    />
    <Container row css={t => ({ marginBottom: t.space[6] })}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query TagTemplate($id: String!) {
    term: tag(id: { eq: $id }) {
      name
      slug
      description
      cover {
        ...CoverImage
      }
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
          tags: { elemMatch: { id: { eq: $id } } }
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
