import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({ data, location }) => (
  <Layout title={`All posts`} bodyClass={`blog`} location={location}>
    {/* <section className="jumbotron text-center">
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
    </section> */}

    <div className="container">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article className="card" key={node.id}>
          <Link className="card-link" to={node.fields.permalink}></Link>
          <Image
            className="card-image"
            fluid={
              node.fields.cover
                ? node.fields.cover.childImageSharp.fluid
                : data.file.childImageSharp.fluid
            }
            alt={node.fields.title}
            title={node.fields.title}
          />
          <div className="card-content">
            <header>
              <span>{node.fields.categories[0].id}</span>
              <h3>{node.fields.title}</h3>
            </header>
            <main>
              <p>{node.excerpt}</p>
            </main>
            <footer>
              <ul>
                {node.fields.authors.map((author, i) => (
                  <li
                    key={author.id}
                    style={{
                      zIndex: node.fields.authors.length - i
                    }}>
                    <Link to={author.fields.permalink} title={author.id}>
                      <Image
                        Tag="span"
                        fixed={author.avatar.childImageSharp.fixed}
                        alt={author.id}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <small>{`${node.timeToRead} min${
                node.timeToRead === 1 ? '' : 's'
              }`}</small>
            </footer>
          </div>
        </article>
      ))}
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
          id
          excerpt
          timeToRead
          fields {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            permalink
            authors {
              id
              avatar {
                childImageSharp {
                  fixed(width: 30, height: 30) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              fields {
                permalink
              }
            }
            categories {
              id
              fields {
                permalink
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
