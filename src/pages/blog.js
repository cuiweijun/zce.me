/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Wrapper, Container, Hero, Card } from '../components'

export default ({ data }) => (
  <Wrapper>
    <Hero
      title="Blog"
      subtitle={`A collection of ${data.allMarkdownRemark.totalCount} posts`}
      cover={data.siteMetadata.cover}
    />
    <Container>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginX: -3,
          marginBottom: 6
        }}>
        {data.allMarkdownRemark.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
    </Container>
  </Wrapper>
)

export const query = graphql`
  query BlogPage {
    siteMetadata: config {
      cover {
        ...CoverImage
      }
    }

    allMarkdownRemark(
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
