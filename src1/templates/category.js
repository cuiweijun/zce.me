import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Card } from '../components'

export default ({ data: { categoriesYaml, allMarkdownRemark }, location }) => (
  <Layout
    className="category"
    title={
      (categoriesYaml.meta && categoriesYaml.meta.title) || categoriesYaml.id
    }
    description={
      (categoriesYaml.meta && categoriesYaml.meta.description) ||
      categoriesYaml.description
    }
    cover={categoriesYaml.cover}
    header={
      <div className="container">
        <h1>{categoriesYaml.id}</h1>
        <p>{categoriesYaml.description}</p>
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
  query CategoryTemplate($id: String!) {
    categoriesYaml(id: { eq: $id }) {
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
          categories: { elemMatch: { id: { eq: $id } } }
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
