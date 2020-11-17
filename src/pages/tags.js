import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero } from '../components'

// TODO: Re-design this page.
export default ({ data: { tags } }) => (
  <Layout title="全部标签">
    <Hero title="标签" subtitle={`总计 ${tags.totalCount} 个话题标签`} />
    <Container width="inner" css={t => ({ marginBottom: t.space[9] })}>
      {tags.nodes.map(item => (
        <Button
          key={item.name}
          as={Link}
          variant="ghost"
          to={item.permalink}
          children={`#${item.name}`}
          css={t => ({ margin: `${t.space[2]} ${t.space[3]}` })}
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
