import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data: { categoriesYaml }, location }) => (
  <Layout location={location}>
    <h1>Category {categoriesYaml.id}</h1>
  </Layout>
)

export const query = graphql`
  query CategoryTemplate($id: String!) {
    categoriesYaml(id: { eq: $id }) {
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
