import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data, location }) => (
  <Layout title={`All posts`} location={location}>
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">
          {data.allMarkdownRemark.totalCount} Posts
        </h1>
        <p className="lead text-muted">{`hi~`}</p>
        <p>
          <a href="/" className="btn btn-primary my-3">
            Getting started
          </a>
        </p>
      </div>
    </section>

    <div className="py-5">
      <div className="container">
        <div className="row">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div
              className="col-md-6 col-lg-4 d-flex"
              key={node.fields.permalink}>
              <div className="card mb-4 shadow-sm">
                {node.fields.cover ? (
                  <Image
                    className="card-img-top"
                    width="100%"
                    height="225"
                    fluid={node.fields.cover.childImageSharp.fluid}
                  />
                ) : (
                  <Image
                    className="card-img-top"
                    width="100%"
                    height="225"
                    fluid={data.file.childImageSharp.fluid}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{node.fields.title}</h3>
                  <p className="card-text">{node.excerpt}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Link
                      className="btn btn-sm btn-outline-secondary"
                      to={node.fields.permalink}>
                      View
                    </Link>
                    <small className="text-muted">{node.timeToRead} mins</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query BlogPage {
    allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            title
            permalink
            cover {
              childImageSharp {
                fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    file(relativePath: { eq: "images/unknown.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
