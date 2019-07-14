import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data: { authorsYaml }, location }) => (
  <Layout location={location}>
    <h1>Author {authorsYaml.id}</h1>
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    authorsYaml(id: { eq: $id }) {
      id
      slug
      email
      avatar
      bio
      website
      location
      social {
        weibo
        wechat
        qq
        zhihu
        github
        medium
        twitter
        facebook
      }
      meta {
        title
        description
      }
      fields {
        permalink
      }
    }
  }
`
