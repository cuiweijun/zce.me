/** @jsx jsx */
import { jsx } from 'theme-ui'
import Helmet from 'react-helmet'

export default ({ title, description, keywords, image }) => (
  <Helmet
    title={title}
    meta={[
      { name: 'description', content: description },
      { name: 'keywords', content: keywords }
      // OpenGraph tags
      // // TODO: website or article? http://ogp.me/#no_vertical
      // { name: 'og:type', content: 'website' },
      // { name: 'og:title', content: siteMetadata.title },
      // { name: 'og:description', content: siteMetadata.description }
      // { name: 'og:image', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.src },
      // { name: 'og:image:width', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationWidth },
      // { name: 'og:image:height', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationHeight }
      // TODO: Twitter & Fackbook Card tags?
    ]}
  />
)
