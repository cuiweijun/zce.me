import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Card } from '../components'

export default ({ data, location }) => (
  <Layout
    className="archive courses"
    title="Courses"
    description={`A collection of ${data.allMarkdownRemark.totalCount} courses`}
    location={location}>
    <div className="container">
      <div className="row">
        {data.allMarkdownRemark.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query CoursesPage {
    allMarkdownRemark(
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
        ...CourseCard
      }
    }
  }
`
