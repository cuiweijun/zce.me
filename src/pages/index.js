import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data, location }) => {
  return (
    <Layout bodyClass="home" location={location}>
      <section>
        <div className="container">
          <p>Hello world</p>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query IndexPage {
    site {
      ...SiteMetadata
    }
    cover: file(relativePath: { eq: "images/cover.jpg" }) {
      ...SiteCoverImage
    }
  }
`
