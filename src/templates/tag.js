import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data: { tagsYaml }, location }) => (
  <Layout location={location}>
    <h1>Tag {tagsYaml.id}</h1>
    <Image fixed={tagsYaml.cover.childImageSharp.fixed} />
  </Layout>
)

export const query = graphql`
  query TagTemplate($id: String!) {
    tagsYaml(id: { eq: $id }) {
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
