import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({ data, location }) => {
  return (
    <Layout bodyClass="home"location={location}>
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
      siteMetadata {
        url
        title
        slogan
        description
        keywords
        author
        language
        menus {
          text
          link
        }
      }
    }
    cover: file(relativePath: { eq: "images/cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1080, maxHeight: 720) {
          ...GatsbyImageSharpFluid
          presentationWidth
          presentationHeight
        }
      }
    }
  }
`
