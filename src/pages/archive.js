import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Hero, Link } from '../components'

let currentYear

export default ({ data: { posts } }) => (
  <Layout
    title="内容归档"
    description={`所有内容归档，总计产出 ${posts.totalCount} 篇内容`}
  >
    <Hero title="归档" subtitle={`总计产出 ${posts.totalCount} 篇内容`} />
    <Container width="inner" sx={{ mb: 9 }}>
      {posts.nodes.map(post => (
        <>
          {currentYear !== post.fields.year &&
            ((currentYear = post.fields.year),
            (<h3 sx={{ mt: 5 }}>{currentYear}</h3>))}
          <div sx={{ my: 3 }}>
            <time
              dateTime={post.fields.date}
              title={post.fields.date}
              aria-label="发表于"
              children={post.fields.formatDate}
              sx={{ color: 'muted', fontFamily: 'mono', fontWeight: 'light' }}
            />
            <span sx={{ ml: 2, color: 'primary' }}>
              【{post.fields.type === 'course' ? '课程' : '文章'}】
            </span>
            <Link
              to={post.fields.permalink}
              title={post.fields.title}
              children={post.fields.title}
            />
          </div>
        </>
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query ArchivePage {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          type: { ne: "page" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
    ) {
      totalCount
      nodes {
        id
        fields {
          title
          date
          year: date(formatString: "yyyy")
          formatDate: date(formatString: "MMM DD")
          type
          permalink
        }
      }
    }
  }
`
