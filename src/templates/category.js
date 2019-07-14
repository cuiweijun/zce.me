import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data: { categoriesYaml }, location }) => (
  <Layout location={location}>
    <h1>Category {categoriesYaml.id}</h1>
    <Image fixed={categoriesYaml.cover.childImageSharp.fixed} />
  </Layout>
)

export const query = graphql`
  query CategoryTemplate($id: String!) {
    categoriesYaml(id: { eq: $id }) {
      id
      slug
      cover {
        childImageSharp {
          fixed(width: 1024) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
