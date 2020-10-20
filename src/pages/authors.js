import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero } from '../components'

// TODO: Re-design this page.
export default ({ data: { authors } }) => (
  <Layout title="全部作者">
    <Hero
      title="作者"
      subtitle={`总计 ${authors.totalCount} 位作者`}
      sx={{ py: '4vw' }}
    />
    <Container width="inner" sx={{ mb: 9 }}>
      {authors.nodes.map(item => (
        <Button
          key={item.name}
          as={Link}
          variant="ghost"
          to={item.permalink}
          children={item.name}
          sx={{ mx: 3, my: 2 }}
        />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query AuthorsPage {
    authors: allAuthor(sort: { fields: name }) {
      totalCount
      nodes {
        name
        # description
        # cover {
        #   ...CardImage
        # }
        permalink
      }
    }
  }
`
