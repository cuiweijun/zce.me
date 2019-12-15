/** @jsx jsx */
import { memo } from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const query = graphql`
  query HeadComponent {
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

// TODO: Need refactoring
export default memo(
  ({ title, description, keywords, type, image, pathname }) => {
    const { config } = useStaticQuery(query)
    const { theme } = useThemeUI()
    const meta = []
    const link = []

    description = description || config.description
    keywords = keywords || config.keywords
    type = type || 'website'
    image = image || config.cover
    const url = pathname ? config.url + pathname : null

    meta.push({
      name: 'description',
      content: description || config.description
    })
    meta.push({ name: 'keywords', content: keywords || config.keywords })
    meta.push({ name: 'theme-color', content: theme.colors.background })
    meta.push({ name: 'og:site_name', content: config.name })
    meta.push({ name: 'og:title', content: title })
    url && meta.push({ name: 'og:url', content: url })
    meta.push({ name: 'og:description', content: description })
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

    url && link.push({ rel: 'canonical', href: url })

    return (
      <Helmet
        defer={false} // refresh on background
        // htmlAttributes={{ lang: config.language }}
        title={title}
        defaultTitle={`${config.title} | ${config.slogan}`}
        titleTemplate={`%s - ${config.title}`}
        // bodyAttributes={{ className: 'zce' }}
        meta={meta}
        link={link}
      />
    )
  }
)
