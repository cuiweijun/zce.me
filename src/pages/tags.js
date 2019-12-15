/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link } from '../components'

export default ({ data: { tags } }) => (
  <Layout title="Tags" subtitle={`A collection of ${tags.totalCount} tags`}>
    <Container width="inner" sx={{ mb: 9 }}>
      {tags.nodes.map(node => (
        <Button
          key={node.name}
          as={Link}
          to={node.permalink}
          children={`#${node.name}`}
          sx={{ mx: 3, my: 2 }}
        />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query TagsPage {
    tags: allTag {
      nodes {
        name
        # description
        # cover {
        #   ...CardImage
        # }
        permalink
      }
      totalCount
    }
  }
`