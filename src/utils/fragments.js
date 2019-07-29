/*
 * NOTE: Gatsby auto-discovers all GraphQL queries and fragments, which means
 * there’s no need to import these fragments to components that will use them.
 */

import { graphql } from 'gatsby'

// // Loads required data to use the `MarkdownSection` component.
// export const MarkdownFragment = graphql`
//   fragment MarkdownFragment on MarkdownRemark {
//     fields {
//       title
//       image {
//         childImageSharp {
//           sizes(maxWidth: 540, traceSVG: { color: "#f6f1fa" }) {
//             ...GatsbyImageSharpSizes_tracedSVG
//           }
//         }
//       }
//     }
//     html
//   }
// `

// Loads all site metadata.
export const SiteMetadata = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      url
      title
      logo
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
`

// Loads layout cover image required data.
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
