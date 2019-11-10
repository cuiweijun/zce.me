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

export default ({ title, description, keywords, type, image, pathname }) => {
  const { config } = useStaticQuery(query)
  const { theme } = useThemeUI()

  title = title || null
  description = description || config.description
  keywords = keywords || config.keywords
  type = type || 'website'
  image = image || config.cover
  pathname = pathname || null

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

  const link = []
  pathname && link.push({ rel: 'canonical', href: config.url + pathname })

  return (
    <Helmet
      htmlAttributes={{ lang: config.language }}
      title={title}
      defaultTitle={`${config.title} | ${config.slogan}`}
      titleTemplate={`%s - ${config.title}`}
      bodyAttributes={{ className: 'zce' }}
      meta={meta}
      link={link}
    />
  )
}
