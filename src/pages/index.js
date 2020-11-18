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
    css={t => ({
      padding: `${t.space[padding] || padding} 0`,
      background: t.colors.light,
      ':nth-of-type(2n)': {
        background: t.colors.background
      }
    })}
  />
)

const Featured = ({ post }) => (
  <Section>
    <Container
      as="article"
      css={{
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
        css={t => ({
          flex: '0 1 22rem',
          order: 0,
          margin: t.space[4],
          border: `24px solid ${t.colors.background}`,
          boxShadow: t.shadows.medium,
          [t.screens.lg]: {
            order: 1
          }
        })}
      />
      <div
        css={t => ({
          flex: '1 1 30rem',
          padding: t.space[2],
          [t.screens.sm]: {
            padding: t.space[4]
          }
        })}
      >
        <h2
          children={post.fields.title}
          css={t => ({ marginBottom: t.space[4], fontSize: t.fontSizes[7] })}
        />
        <div
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
          css={t => ({
            marginBottom: t.space[4],
            fontSize: t.fontSizes.lg,
            lineHeight: t.lineHeights.loose,
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0), #000 10%, #000)'
          })}
        />
        <Button
          as={Link}
          variant="ghost"
          to={post.fields.permalink}
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
      <header css={t => ({ marginBottom: t.space[5], textAlign: 'center' })}>
        <h2 children={title} css={t => ({ fontSize: t.fontSizes[7] })} />
        <p
          children={subtitle}
          css={t => ({ fontSize: t.fontSizes.lg, color: t.colors.muted })}
        />
      </header>
      <Row css={t => ({ marginBottom: t.space[3] })}>
        {posts.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
      <footer css={{ textAlign: 'center' }}>
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
    <Hero
      title={meta.name}
      subtitle={meta.description}
      css={{
        paddingTop: '16vw',
        paddingBottom: '16vw',
        h1: { fontSize: 'calc(4rem + 2.5vw)' },
        p: { fontSize: 'calc(1rem + 0.5vw)' }
      }}
    />

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
      <Container css={{ textAlign: 'center' }}>
        <h2
          children={about.fields.title}
          css={t => ({
            marginBottom: t.space[5],
            fontSize: t.fontSizes[10],
            opacity: 0.3
          })}
        />
        <div
          dangerouslySetInnerHTML={{ __html: about.html }}
          css={t => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: t.colors.muted
          })}
        />
      </Container>
    </Section>

    <Section padding={5}>
      <Container
        as="p"
        children={meta.slogan}
        css={t => ({
          marginBottom: 0,
          color: t.colors.muted,
          fontFamily: t.fonts.serif,
          fontSize: t.fontSizes.xl,
          textAlign: 'center',
          opacity: 0.5
        })}
      />
    </Section>
  </Layout>
)

export const query = graphql`
  query HomePage {
    meta: config {
      name
      description
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
