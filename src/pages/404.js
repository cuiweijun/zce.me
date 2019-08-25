import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/card'

export default ({ data, location }) => (
  <Layout
    className="error error-404"
    title="404 Not found"
    cover={null}
    header={
      <div className="container">
        <h1>404</h1>
        <p>Page not found</p>
        <Link className="btn btn-light btn-sm" to="/">
          Back to Home &rarr;
        </Link>
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
  query NotFoundPage {
    allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 3
    ) {
      totalCount
      nodes {
        ...PostCard
      }
    }
  }
`
