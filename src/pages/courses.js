import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Container, Hero, Cover, Card } from '../components'

export default ({ data: { courses } }) => (
  <Layout title="全部课程">
    <Cover />
    <Hero title="课程" subtitle={`目前共有 ${courses.totalCount} 套课程`} />
    <Container row sx={{ mb: 6 }}>
      {courses.nodes.map(node => (
        <Card post={node} key={node.id} />
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
  query CoursesPage {
    courses: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "course" }
          draft: { eq: false }
          private: { eq: false }
        }
      }
      sort: { fields: fields___date, order: DESC }
    ) {
      totalCount
      nodes {
        ...Card
      }
    }
  }
`
