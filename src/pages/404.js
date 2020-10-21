import React from 'react'
import { graphql } from 'gatsby'

import {
  Layout,
  Container,
  Button,
  Link,
  Hero,
  Cover,
  Card
} from '../components'
import { keyframes } from '../utils'

const move = keyframes`
  10% {
    top: -0.8px;
    left: -2.2px;
  }
  20% {
    filter: hue-rotate(-90deg);
    top: 0.8px;
    left: -0.4px;
  }
  30% {
    filter: hue-rotate(0);
    left: 1px;
  }
  40% {
    top: -0.6px;
    left: -1.4px;
  }
  50% {
    filter: blur(1px);
    left: 0.4px;
  }
  60% {
    filter: blur(0);
    top: 3.6px;
    left: -2.4px;
  }
  70% {
    top: -2px;
    left: 0.2px;
  }
  80% {
    top: -0.8px;
    left: -1.8px;
  }
  90% {
    left: 2.4px;
  }
  100% {
    left: -2.4px;
  }
`

const Heading = () => (
  <h1
    children="404"
    sx={{
      display: 'inline-block',
      position: 'relative',
      mb: '5vw',
      fontSize: 'calc(8rem + 10vw)',
      color: 'transparent',
      ':before': {
        position: 'absolute',
        top: 0,
        left: 0,
        content: '"404"',
        color: 'red',
        mixBlendMode: 'lighten',
        animation: `${move} 0.95s infinite`
      },
      ':after': {
        position: 'absolute',
        top: 0,
        left: 0,
        content: '"404"',
        color: 'cyan',
        mixBlendMode: 'lighten',
        animation: `${move} 2.2s infinite -0.5s`
      }
    }}
  />
)

export default ({ data: { posts } }) => (
  <Layout title="404 Not found">
    <Cover type={Cover.types.blur} />
    <Hero sx={{ py: '8vw' }}>
      <Heading />
      <p sx={{ mb: 6 }}>你似乎来到了新大陆～</p>
      <Button as={Link} variant="ghost" color="light" to="/">
        返回首页 <span aria-hidden="true">&rarr;</span>
      </Button>
    </Hero>
    <Container row sx={{ mb: 6 }}>
      {posts.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query NotFoundPage {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 3
    ) {
      totalCount
      nodes {
        ...Card
      }
    }
  }
`
