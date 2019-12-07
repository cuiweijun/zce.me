/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { Layout, Container, Row, Card } from '../components'

export default ({ data: { courses } }) => (
  <Layout
    title="Courses"
    // subtitle={`A collection of ${courses.totalCount} courses`}
    subtitle="Continuous learning is a belief.">
    <Container>
      <Row sx={{ mb: 6 }}>
        {courses.nodes.map(node => (
          <Card post={node} key={node.id} />
        ))}
      </Row>
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
