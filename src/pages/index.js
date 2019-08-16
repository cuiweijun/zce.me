import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Card from '../components/card'

const FeaturedSection = ({ post }) => (
  <section className="home-section">
    <div className="container">
      <article className="featured">
        {post.fields.cover && (
          <Image
            Tag="figure"
            className="featured-cover"
            alt={post.fields.title}
            title={post.fields.title}
            fluid={post.fields.cover.childImageSharp.fluid}
          />
        )}
        <div className="featured-content">
          <h2 className="featured-title">{post.fields.title}</h2>
          <main
            className="featured-main"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <Link className="featured-link" to={post.fields.permalink}>
            Continue reading <span>&rarr;</span>
          </Link>
        </div>
      </article>
    </div>
  </section>
)

export default ({ data: { featured, latest, about }, location }) => {
  return (
    <Layout bodyClass="home" location={location}>
      <FeaturedSection post={featured.nodes[0]} />

      <section className="home-section">
        <div className="container">
          <header className="home-section-header">
            <h2>Latest Posts</h2>
            <p>Keep the dots in your life.</p>
          </header>
          <main className="home-section-main row">
            {latest.nodes.map(node => (
              <Card post={node} key={node.id} />
            ))}
          </main>
          <footer className="home-section-footer">
            <Link to="/blog/">
              Find More <span aria-hidden="true">&rarr;</span>
            </Link>
          </footer>
        </div>
      </section>

      <FeaturedSection post={featured.nodes[1]} />

      <section className="home-section">
        <div className="container">
          <div className="about">
            <h2 className="about-title">{about.fields.title}</h2>
            <div
              className="about-content"
              dangerouslySetInnerHTML={{ __html: about.html }}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    featured: allMarkdownRemark(
      filter: { fields: { featured: { eq: true } } }
      sort: { fields: fields___date, order: DESC }
      limit: 2
    ) {
      nodes {
        fields {
          title
          cover {
            childImageSharp {
              fluid(maxWidth: 360, maxHeight: 480, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          permalink
        }
        excerpt(format: HTML, pruneLength: 500)
      }
    }
    latest: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 6
    ) {
      nodes {
        ...PostCard
      }
    }
    about: markdownRemark(fields: { slug: { eq: "about" } }) {
      fields {
        title
      }
      html
    }
  }
`
