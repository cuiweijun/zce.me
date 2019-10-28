import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Card } from '../components'

export default ({ data: { tag, allMarkdownRemark }, location }) => (
  <Layout
    className="archive tag"
    title={(tag.meta && tag.meta.title) || tag.name}
    description={(tag.meta && tag.meta.description) || tag.description}
    cover={tag.cover}
    header={
      <div className="container">
        <h1>{tag.name}</h1>
        <p>{tag.description}</p>
      </div>
    }
    location={location}>
    <div className="container">
      <div className="row">
        {allMarkdownRemark.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query TagTemplate($id: String!) {
    tag(id: { eq: $id }) {
      name
      description
      cover {
        ...SiteCoverImage
      }
      meta {
        title
        description
      }
    }

    allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
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
