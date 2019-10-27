import React from 'react'
// import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ pageContext: { video, prev, next }, location }) => (
  <Layout className="video" title={video.name} location={location}>
    <h1>{video.name}</h1>
    <video src={video.url} controls></video>
    {/* <Link to={prev.}></Link> */}
  </Layout>
)
