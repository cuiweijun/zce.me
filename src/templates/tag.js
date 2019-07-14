import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data: { tagsYaml }, location }) => (
  <Layout location={location}>
    <h1>Tag {tagsYaml.id}</h1>
  </Layout>
)

export const query = graphql`
  query TagTemplate($id: String!) {
    tagsYaml(id: { eq: $id }) {
      id
      slug
      description
      meta {
        title
        description
      }
      fields {
        permalink
      }
    }
  }
`
