import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Comments } from '../components'

export default ({ data, location }) => (
  <Layout
    className="discuss"
    title="Discuss"
    description="Leave a message for me."
    cover={false}
    location={location}>
    <div className="container">
      <Comments
        url={data.siteMetadata.url + location.pathname}
        slug="discuss"
      />
    </div>
  </Layout>
)

export const query = graphql`
  query DiscussPage {
    siteMetadata: config {
      url
    }
  }
`
