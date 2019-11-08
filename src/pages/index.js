/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Link, Button, Card } from '../components'

const FeaturedSection = ({ post }) => (
  <section>
    <div>
      <article>
        {post.fields.cover && (
          <Image
            Tag="figure"
            alt={post.fields.title}
            title={post.fields.title}
            fluid={post.fields.cover.childImageSharp.fluid}
          />
        )}
        <div>
          <h2>{post.fields.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <Button
            as={Link}
            to={post.fields.permalink}
            title={post.fields.title}>
            Continue reading <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </article>
    </div>
  </section>
)

const FeedSection = ({ posts, title, subtitle, link }) => (
  <section>
    <div>
      <header>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <div>
        {posts.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
      <footer>
        <Button as={Link} to={link} title={title}>
          Explore more <span aria-hidden="true">&rarr;</span>
        </Button>
      </footer>
    </div>
  </section>
)

export default ({ data }) => (
  <div>
    {data.featured.nodes[0] && (
      <FeaturedSection post={data.featured.nodes[0]} />
    )}

    <FeedSection
      posts={data.latestPosts.nodes}
      title="Latest Posts"
      subtitle="Keep the dots in your life."
      link="/blog/"
    />

    {data.featured.nodes[1] && (
      <FeaturedSection post={data.featured.nodes[1]} />
    )}

    <FeedSection
      posts={data.latestCourses.nodes}
      title="Latest Courses"
      subtitle="Continuous learning is a belief."
      link="/courses/"
    />

    {/* {data.featured.nodes[2] && (
      <FeaturedSection post={data.featured.nodes[2]} />
    )}

    <section>
      <div>
        <p>I'm Lei Wang, a technical poet of China.</p>
      </div>
    </section> */}

    <section>
      <div>
        <div>
          <h2>{data.about.fields.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.about.html }} />
        </div>
      </div>
    </section>
  </div>
)

export const query = graphql`
  query HomePage {
    featured: allMarkdownRemark(
      filter: {
        fields: {
          featured: { eq: true }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 2
    ) {
      nodes {
        fields {
          title
          slug
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
        ...Card
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
        ...Card
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
