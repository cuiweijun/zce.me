import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Layout, Card } from '../components'

export default ({ data: { author, allMarkdownRemark }, location }) => (
  <Layout
    className={`archive author ${author.slug}`}
    title={(author.meta && author.meta.title) || author.name}
    description={(author.meta && author.meta.description) || author.bio}
    cover={author.cover}
    header={
      <div className="container">
        <Image
          className="author-avatar"
          fixed={author.avatar.childImageSharp.fixed}
        />
        <h1 className="author-name">{author.name}</h1>
        <p className="author-bio">{author.bio}</p>
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
    author(id: { eq: $id }) {
      name
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

    allMarkdownRemark(
      filter: {
        fields: {
          type: { ne: "page" }
          draft: { eq: false }
          private: { eq: false }
          authors: { elemMatch: { id: { eq: $id } } }
        }
      }
      sort: { fields: fields___date, order: DESC }
    ) {
      totalCount
      nodes {
        ...Card
      }
    }
  }
`
