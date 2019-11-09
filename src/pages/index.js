/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Container, Link, Button, Image, Card } from '../components'

const Section = props => <section {...props} sx={{ paddingY: 9 }} />

const FeaturedSection = ({ post }) => (
  <Section>
    <Container>
      <article>
        <Image
          as="figure"
          alt={post.fields.title}
          title={post.fields.title}
          file={post.fields.cover}
        />
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
    </Container>
  </Section>
)

const FeedSection = ({ posts, title, subtitle, link }) => (
  <Section>
    <Container>
      <header sx={{ marginBottom: 5, textAlign: 'center' }}>
        <h2 sx={{ margin: 0, marginBottom: 3, fontSize: 7 }}>{title}</h2>
        <p sx={{ margin: 0, fontSize: 'lg' }}>{subtitle}</p>
      </header>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginX: -3,
          marginBottom: 3
        }}>
        {posts.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
      <footer sx={{ textAlign: 'center' }}>
        <Button as={Link} size="lg" to={link} title={title}>
          Explore more <span aria-hidden="true">&rarr;</span>
        </Button>
      </footer>
    </Container>
  </Section>
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

    <Section>
      <div>
        <p>I'm Lei Wang, a technical poet of China.</p>
      </div>
    </Section> */}

    <Section>
      <Container>
        <h2>{data.about.fields.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.about.html }} />
      </Container>
    </Section>
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
