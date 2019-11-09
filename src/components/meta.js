/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const query = graphql`
  query LayoutComponent {
    siteMetadata: config {
      url
      name
      title
      description
      slogan
      keywords
      author {
        name
      }
      language
    }
  }
`

export default ({ title, description, keywords, image, ...props }) => {
  const { theme } = useThemeUI()
  const { siteMetadata } = useStaticQuery(query)
  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.language }}
      defaultTitle={`${siteMetadata.title} | ${siteMetadata.slogan}`}
      titleTemplate={`%s - ${siteMetadata.title} | ${siteMetadata.slogan}`}
      bodyAttributes={{ className: 'zce' }}
      meta={[
        { name: 'description', content: siteMetadata.description },
        { name: 'keywords', content: siteMetadata.keywords },
        { name: 'author', content: siteMetadata.author.name },
        { name: 'theme-color', content: theme.colors.background },
        // OpenGraph tags
        { name: 'og:site_name', content: siteMetadata.name },
        // TODO: website or article? http://ogp.me/#no_vertical
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: siteMetadata.title },
        { name: 'og:description', content: siteMetadata.description }
        // { name: 'og:image', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.src },
        // { name: 'og:image:width', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationWidth },
        // { name: 'og:image:height', content: siteMetadata.url + siteMetadata.cover.childImageSharp.fluid.presentationHeight }
        // TODO: Twitter & Fackbook Card tags?
      ]}
      link={[
        { rel: 'canonical', href: siteMetadata.url + props.location.pathname }
      ]}
    />
  )
}
