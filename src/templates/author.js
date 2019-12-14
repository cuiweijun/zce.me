/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card, Avatar } from '../components'

export default ({ data: { author, posts } }) => (
  <Layout
    title={(author.meta && author.meta.title) || author.name}
    description={(author.meta && author.meta.description) || author.bio}
    keywords={author.meta && author.meta.keywords}
    subtitle={author.bio}
    cover={author.cover}
    hero={
      <Container sx={{ py: '5vw', color: 'white', textAlign: 'center' }}>
        <Avatar
          name={author.name}
          image={author.avatar}
          sx={{ mb: 3, boxShadow: 'light' }}
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
