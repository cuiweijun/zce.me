import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero } from '../components'

// TODO: Re-design this page.
export default ({ data: { categories } }) => (
  <Layout title="全部分类">
    <Hero title="分类" subtitle={`总计 ${categories.totalCount} 个分类`} />
    <Container width="inner" css={t => ({ marginBottom: t.space[9] })}>
      {categories.nodes.map(item => (
        <Button
          key={item.name}
          as={Link}
          variant="ghost"
          to={item.permalink}
          children={item.name}
          css={t => ({ margin: `${t.space[2]} ${t.space[3]}` })}
        />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query CategoriesPage {
    categories: allCategory(sort: { fields: name }) {
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
