import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import { Layout, Card } from '../components'

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
        <div className="featured-main">
          <h2 className="featured-title">{post.fields.title}</h2>
          <div
            className="featured-content"
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

const FeedSection = ({ posts, title, subtitle, link }) => (
  <section className="home-section">
    <div className="container">
      <header className="home-section-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <div className="home-section-content">
        {posts.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
      <footer className="home-section-footer">
        <Link className="btn btn-lg btn-pill" to={link}>
          Explore more <span aria-hidden="true">&rarr;</span>
        </Link>
      </footer>
    </div>
  </section>
)

export default ({ data, location }) => {
  return (
    <Layout className="home" location={location}>
      <FeaturedSection post={data.featured.nodes[0]} />

      <FeedSection
        posts={data.latestPosts}
        title="Latest Posts"
        subtitle="Keep the dots in your life."
        link="/blog/"
      />

      <FeaturedSection post={data.featured.nodes[1]} />

      <FeedSection
        posts={data.latestCourses}
        title="Latest Courses"
        subtitle="Continuous learning is a belief."
        link="/courses/"
      />

      <section className="home-section">
        <div className="container">
          <div className="about">
            <h2 className="about-title">{data.about.fields.title}</h2>
            <div
              className="about-content"
              dangerouslySetInnerHTML={{ __html: data.about.html }}
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

    latestPosts: allMarkdownRemark(
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

    latestCourses: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "course" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 6
    ) {
      nodes {
        ...CourseCard
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
