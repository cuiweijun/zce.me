import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/card'

export default ({ data, location }) => (
  <Layout
    className="blog"
    title="All posts"
    header={
      <div className="container">
        <h1>Blog</h1>
        <p>A collection of {data.allMarkdownRemark.totalCount} posts</p>
      </div>
    }
    location={location}>
    <div className="container">
      <div className="row">
        {data.allMarkdownRemark.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query BlogPage {
    allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
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
