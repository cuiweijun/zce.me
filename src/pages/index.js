/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import {
  Layout,
  Container,
  Row,
  Link,
  Button,
  Image,
  Card
} from '../components'

const Section = ({ padding = 8, ...props }) => (
  <section
    {...props}
    sx={{
      py: padding,
      bg: 'light',
      transition: 'background 0.3s',
      ':nth-of-type(2n)': {
        bg: 'background'
      }
    }}
  />
)

const Featured = ({ post }) => (
  <Section>
    <Container
      as="article"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
      <Image
        as="figure"
        file={post.fields.cover}
        alt={post.fields.title}
        title={post.fields.title}
        sx={{
          flexBasis: '22rem',
          order: [0, 0, 1],
          m: 0,
          mb: [4, 4, 0],
          ml: [0, 0, 4],
          border: 6,
          borderColor: 'background',
          boxShadow: 'medium',
          transition: 'border 0.3s'
        }}
      />
      <div
        sx={{
          flexGrow: 1,
          flexBasis: '23rem',
          p: 4,
          lineHeight: 'loose'
        }}>
        <h2 sx={{ mb: 4, fontSize: 7 }}>{post.fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
          sx={{
            mb: 4,
            maskImage:
              'linear-gradient(to top, rgba(0, 0, 0, 0), #000 10%, #000)'
          }}
        />
        <Button
          as={Link}
          to={post.fields.permalink}
          variant="ghost"
          title={post.fields.title}>
          Continue reading <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </Container>
  </Section>
)

const Feed = ({ posts, title, subtitle, link }) => (
  <Section>
    <Container>
      <header sx={{ mb: 5, textAlign: 'center' }}>
        <h2 sx={{ m: 0, mb: 3, fontSize: 7 }}>{title}</h2>
        <p sx={{ m: 0, fontSize: 'lg' }}>{subtitle}</p>
      </header>
      <Row sx={{ mb: 3 }}>
        {posts.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
      <footer sx={{ textAlign: 'center' }}>
        <Button as={Link} to={link} title={title} size="lg" variant="outline">
          Explore more <span aria-hidden="true">&rarr;</span>
        </Button>
      </footer>
    </Container>
  </Section>
)

export default ({ data: { featured, posts, courses, about, meta } }) => (
  <Layout padding="18vw" mask={1}>
    {featured.nodes[0] && <Featured post={featured.nodes[0]} />}

    <Feed
      posts={posts.nodes}
      title="Latest Posts"
      subtitle="Keep the dots in your life."
      link="/blog/"
    />

    {featured.nodes[1] && <Featured post={featured.nodes[1]} />}

    <Feed
      posts={courses.nodes}
      title="Latest Courses"
      subtitle="Continuous learning is a belief."
      link="/courses/"
    />

    {featured.nodes[2] && <Featured post={featured.nodes[2]} />}

    <Section>
      <Container sx={{ textAlign: 'center' }}>
        <h2 sx={{ fontSize: 10, opacity: 0.3, mb: 5 }}>{about.fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: about.html }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'muted'
          }}
        />
      </Container>
    </Section>

    <Section padding={6}>
      <Container>
        <p
          children={meta.slogan}
          sx={{
            color: 'muted',
            fontFamily: 'serif',
            fontSize: 'xl',
            textAlign: 'center'
          }}
        />
      </Container>
    </Section>
  </Layout>
)

export const query = graphql`
  query HomePage {
    meta: config {
      slogan
    }

    featured: allMarkdownRemark(
      filter: {
        fields: {
          featured: { eq: true }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 3
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

    posts: allMarkdownRemark(
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

    courses: allMarkdownRemark(
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
