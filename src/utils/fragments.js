/*
 * NOTE: Gatsby auto-discovers all GraphQL queries and fragments, which means
 * there’s no need to import these fragments to components that will use them.
 */

import { graphql } from 'gatsby'

// Load all site metadata.
export const SiteMetadata = graphql`
  fragment SiteMetadata on Query {
    siteMetadata: metaYaml {
      id
      url
      name
      title
      description
      slogan
      keywords
      author {
        name
        email
        url
      }
      language
      cover {
        ...SiteCoverImage
      }
      navigation {
        text
        link
      }
      socials {
        name
        link
      }
      links {
        text
        link
      }
      subscription {
        name
        qrcode
      }
      card {
        image {
          ...PostCardImage
        }
      }
      disqus {
        shortname
      }
    }
  }
`

// Load layout cover image required data.
export const SiteCoverImage = graphql`
  fragment SiteCoverImage on File {
    childImageSharp {
      fluid(maxWidth: 1080, maxHeight: 720, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
        presentationWidth
        presentationHeight
      }
    }
  }
`

// Load post card image required data.
export const PostCardImage = graphql`
  fragment PostCardImage on File {
    childImageSharp {
      fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

// Load post card component required data.
export const PostCard = graphql`
  fragment PostCard on MarkdownRemark {
    id
    excerpt
    timeToRead
    fields {
      title
      cover {
        ...PostCardImage
      }
      permalink
      authors {
        id
        avatar {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        fields {
          permalink
        }
      }
      categories {
        id
        fields {
          permalink
        }
      }
    }
  }
`
