import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Layout } from '../components'

export default ({ data, location }) => {
  const { post } = data
  const { fields, frontmatter } = post

  return (
    <Layout
      className="course"
      title={fields.title}
      description={fields.description || post.excerpt}
      cover={false}
      header={
        <div className="container">
          <h1>{fields.title}</h1>
        </div>
      }
      location={location}>
      {fields.cover && (
        <Image
          Tag="figure"
          className="course-cover container"
          alt={fields.title}
          title={fields.title}
          fluid={fields.cover.childImageSharp.fluid}
        />
      )}
      <section
        className="course-content container"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <ul>
        {frontmatter.sections.map(item => (
          <li key={item.name}>
            <span>{item.name}</span>
            <video src={item.url} controls></video>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query CourseTemplate($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      fields {
        title
        cover {
          ...SiteCoverImage
        }
        description
        permalink
      }
      frontmatter {
        sections {
          name
          url
        }
      }
      excerpt(pruneLength: 160)
      html
    }
  }
`
