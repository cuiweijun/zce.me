import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Button, Link, Hero } from '../components'

// TODO: Re-design this page.
export default ({ data: { authors } }) => (
  <Layout title="全部作者">
    <Hero title="作者" subtitle={`总计 ${authors.totalCount} 位作者`} />
    <Container width="inner" css={t => ({ marginBottom: t.space[9] })}>
      {authors.nodes.map(item => (
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
