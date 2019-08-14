import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Card from '../components/card'

export default ({ data: { authorsYaml, allMarkdownRemark }, location }) => (
  <Layout
    title={(authorsYaml.meta && authorsYaml.meta.title) || authorsYaml.id}
    description={
      (authorsYaml.meta && authorsYaml.meta.description) || authorsYaml.bio
    }
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
  query AuthorTemplate($id: String!) {
    authorsYaml(id: { eq: $id }) {
      id
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
    allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
          authors: { elemMatch: { id: { eq: $id } } }
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
