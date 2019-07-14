import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data: { authorsYaml }, location }) => (
  <Layout location={location}>
    <Image fixed={authorsYaml.avatar.childImageSharp.fixed} />
    <h1>Author {authorsYaml.id}</h1>
    <Image fixed={authorsYaml.cover.childImageSharp.fixed} />
  </Layout>
)

export const query = graphql`
  query AuthorTemplate($id: String!) {
    authorsYaml(id: { eq: $id }) {
      id
      slug
      avatar {
        childImageSharp {
          fixed(width: 512) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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
