import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Card } from '../components'

export default ({ data: { tagsYaml, allMarkdownRemark }, location }) => (
  <Layout
    className="tag"
    title={(tagsYaml.meta && tagsYaml.meta.title) || tagsYaml.id}
    description={
      (tagsYaml.meta && tagsYaml.meta.description) || tagsYaml.description
    }
    cover={tagsYaml.cover}
    header={
      <div className="container">
        <h1>{tagsYaml.id}</h1>
        <p>{tagsYaml.description}</p>
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
    tagsYaml(id: { eq: $id }) {
      id
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
        ...PostCard
      }
    }
  }
`
