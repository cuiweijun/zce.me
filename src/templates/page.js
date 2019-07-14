import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data: { markdownRemark }, location }) => (
  <Layout location={location}>
    <h1>{markdownRemark.fields.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        title
        permalink
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
