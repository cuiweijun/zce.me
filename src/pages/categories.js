import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero, Cover } from '../components'

export default ({ data: { categories } }) => (
  <Layout title="全部分类">
    <Cover />
    <Hero title="分类" />
    <Container width="inner" sx={{ mb: 9 }}>
      {categories.nodes.map(node => (
        <Button
          key={node.name}
          as={Link}
          to={node.permalink}
          children={node.name}
          sx={{ mx: 3, my: 2 }}
        />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query CategoriesPage {
    categories: allCategory {
      nodes {
        name
        # description
        # cover {
        #   ...CardImage
        # }
        permalink
      }
      # totalCount
    }
  }
`
