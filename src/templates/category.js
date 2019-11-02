import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Card } from '../components'

export default ({ data: { category, allMarkdownRemark }, location }) => (
  <Layout
    className={`archive category ${category.slug}`}
    title={(category.meta && category.meta.title) || category.name}
    description={
      (category.meta && category.meta.description) || category.description
    }
    cover={category.cover}
    header={
      <div className="container">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
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
    category(id: { eq: $id }) {
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
          type: { ne: "page" }
          draft: { eq: false }
          private: { eq: false }
          categories: { elemMatch: { id: { eq: $id } } }
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
