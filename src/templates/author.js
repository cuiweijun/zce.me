import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data: { authorsYaml }, location }) => (
  <Layout
    title={(authorsYaml.meta && authorsYaml.meta.title) || authorsYaml.id}
    description={(authorsYaml.meta && authorsYaml.meta.description) || authorsYaml.bio}
    bodyClass="author"
    cover={authorsYaml.cover}
    heading={
      <div className="container">
        <Image fixed={authorsYaml.avatar.childImageSharp.fixed} />
        <h1>{authorsYaml.id}</h1>
        <p>{authorsYaml.bio}</p>
      </div>
    }
    location={location}>

  </Layout>
)

export const query = graphql`
  query AuthorTemplate($id: String!) {
    authorsYaml(id: { eq: $id }) {
      id
      slug
      avatar {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cover {
        ...SiteCoverImage
      }
      bio
      meta {
        title
        description
      }
    }
  }
`
