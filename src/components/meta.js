/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const query = graphql`
  query MetaComponent {
    config {
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
      cover {
        childImageSharp {
          fluid {
            src
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`

export default ({ title, description, keywords, type, image }) => {
  const { config } = useStaticQuery(query)
  const { theme } = useThemeUI()
  image = config.cover

  const meta = []
  meta.push({ name: 'description', content: description || config.description })
  meta.push({ name: 'keywords', content: keywords || config.keywords })
  meta.push({ name: 'theme-color', content: theme.colors.background })
  // TODO: website or article? http://ogp.me/#no_vertical
  meta.push({ name: 'og:type', content: type || 'website' })
  if (typeof image === 'string' && /^http/.test(image)) {
    meta.push({ name: 'og:image', content: image })
  }
  if (image && image.childImageSharp) {
    const img = image.childImageSharp.fluid || image.childImageSharp.fixed
    meta.push({ name: 'og:image', content: config.url + img.src })
    img.width && meta.push({ name: 'og:image:width', content: img.width })
    img.height && meta.push({ name: 'og:image:height', content: img.height })
    img.presentationWidth &&
      meta.push({ name: 'og:image:width', content: img.presentationWidth })
    img.presentationHeight &&
      meta.push({ name: 'og:image:height', content: img.presentationHeight })
  }

  return <Helmet title={title} meta={meta} />
}

// export default ({ title, description, keywords, type, image}) => {
//   const { config } = useStaticQuery(query)
//   const theme = useThemeUI()

//   const meta = []

//   description && meta.push({ name: 'description', content: description })
//   keywords && meta.push({ name: 'keywords', content: keywords })

//   // TODO: website or article? http://ogp.me/#no_vertical
//   meta.push({ name: 'og:type', content: type || 'website' })

//   if (typeof image === 'string') {
//     meta.push({ name: 'og:image', content: image })
//   }

//   // TODO: Twitter & Fackbook Card tags?

//   if (image && image.childImageSharp) {
//     const img = image.childImageSharp.fluid || image.childImageSharp.fixed
//     meta.push({ name: 'og:image', content: config.url + img.src })
//     img.presentationWidth &&
//       meta.push({ name: 'og:image:width', content: img.presentationWidth })
//     img.presentationHeight &&
//       meta.push({ name: 'og:image:height', content: img.presentationHeight })
//   }

//   return <Helmet title={title} meta={meta} />
// }

//
// const Head = ({ location }) => {
//   const { config } = useStaticQuery(query)
//   const { fluid } = config.cover.childImageSharp
//   return (
//     <Helmet
//       htmlAttributes={{ lang: config.language }}
//       defaultTitle={`${config.title} | ${config.slogan}`}
//       titleTemplate={`%s - ${config.title}`}
//       bodyAttributes={{ className: 'zce' }}
//       meta={[
//         { name: 'description', content: config.description },
//         { name: 'keywords', content: config.keywords },
//         { name: 'author', content: config.author.name },
//         { name: 'theme-color', content: theme.colors.background },
//         { name: 'og:site_name', content: config.name },
//         { name: 'og:type', content: 'website' },
//         { name: 'og:title', content: config.title },
//         { name: 'og:description', content: config.description },
//         { name: 'og:image', content: config.url + fluid.src },
//         { name: 'og:image:width', content: fluid.presentationWidth },
//         { name: 'og:image:height', content: fluid.presentationHeight }
//       ]}
//       link={[{ rel: 'canonical', href: config.url + location.pathname }]}
//     />
//   )
// }
