import React from 'react'
import { graphql } from 'gatsby'

import {
  Layout,
  Container,
  Row,
  Link,
  Button,
  Image,
  Hero,
  Cover,
  Card
} from '../components'

const Section = ({ padding = 8, ...props }) => (
  <section
    {...props}
    sx={{
      py: padding,
      bg: 'light',
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
      }}
    >
      <Image
        as="figure"
        file={post.fields.cover}
        alt={post.fields.title}
        title={post.fields.title}
        sx={{
          flex: '0 1 22rem',
          order: [0, null, null, 1],
          m: 4,
          border: 6,
          borderColor: 'background',
          boxShadow: 'medium'
        }}
      />
      <div sx={{ flex: '1 1 30rem', p: [2, 4] }}>
        <h2 sx={{ mb: 4, fontSize: 7 }}>{post.fields.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
          sx={{
            mb: 4,
            fontSize: 'lg',
            lineHeight: 'loose',
            maskImage:
              'linear-gradient(to top, rgba(0, 0, 0, 0), #000 10%, #000)'
          }}
        />
        <Button
          as={Link}
          to={post.fields.permalink}
          variant="ghost"
          title={post.fields.title}
        >
          继续阅读 <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </Container>
  </Section>
)

const Feed = ({ posts, title, subtitle, link }) => (
  <Section>
    <Container>
      <header sx={{ mb: 5, textAlign: 'center' }}>
        <h2 sx={{ fontSize: 7 }}>{title}</h2>
        <p sx={{ fontSize: 'lg', color: 'muted' }}>{subtitle}</p>
      </header>
      <Row sx={{ mb: 3 }}>
        {posts.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
      <footer sx={{ textAlign: 'center' }}>
        <Button as={Link} to={link} title={title} size="lg" variant="outline">
          发现更多 <span aria-hidden="true">&rarr;</span>
        </Button>
      </footer>
    </Container>
  </Section>
)

export default ({ data: { featured, posts, courses, about, meta } }) => (
  <Layout>
    <Cover type={Cover.types.mask} />

    <Hero sx={{ py: '18vw', h1: { fontSize: '6rem' } }} />

    {featured.nodes[0] && <Featured post={featured.nodes[0]} />}

    <Feed
      posts={posts.nodes}
      title="近期文章"
      subtitle="留住生活中的点点滴滴，贵在记录和分享"
      link="/blog/"
    />

    {featured.nodes[1] && <Featured post={featured.nodes[1]} />}

    <Feed
      posts={courses.nodes}
      title="最新课程"
      subtitle="咱们一起来玩点新鲜好玩、有意思的东西，持续学习是一种信仰"
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
      <Container
        as="p"
        children={meta.slogan}
        sx={{
          color: 'muted',
          fontFamily: 'serif',
          fontSize: 'xl',
          textAlign: 'center'
        }}
      />
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
        excerpt(format: HTML, pruneLength: 400)
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
