import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/card'

export default ({ data, location }) => {
  return (
    <Layout bodyClass="home" location={location}>
      <section className="home-section">
        <div className="container">

        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <header className="home-section-header">
            <h2>Latest Posts</h2>
            <p>Keep the dots in your life.</p>
          </header>
          <main className="home-section-main row">
            {data.recentPosts.nodes.map(node => (
              <Card post={node} key={node.id} />
            ))}
          </main>
          <footer className="home-section-footer">
            <Link to="/blog/">Find More <span aria-hidden="true">&rarr;</span></Link>
          </footer>
        </div>
      </section>

      <section className="home-section">
        <div className="container">

        </div>
      </section>

      <section className="home-section">
        <div className="container">

        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query IndexPage {
    recentPosts: allMarkdownRemark(
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
        ...PostCard
      }
    }
  }
`
