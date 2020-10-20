import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero } from '../components'

// TODO: Re-design this page.
export default ({ data: { tags } }) => (
  <Layout title="全部标签">
    <Hero
      title="标签"
      subtitle={`总计 ${tags.totalCount} 个话题标签`}
      sx={{ py: '4vw' }}
    />
    <Container width="inner" sx={{ mb: 9 }}>
      {tags.nodes.map(item => (
        <Button
          key={item.name}
          as={Link}
          variant="ghost"
          to={item.permalink}
          children={`#${item.name}`}
          sx={{ mx: 3, my: 2 }}
        />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query TagsPage {
    tags: allTag(sort: { fields: name }) {
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
