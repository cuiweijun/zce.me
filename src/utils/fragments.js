/*
 * NOTE: Gatsby auto-discovers all GraphQL queries and fragments, which means
 * there’s no need to import these fragments to components that will use them.
 */

// import { graphql } from 'gatsby'

// // Load all site metadata.
// export const SiteMetadata = graphql`
//   fragment SiteMetadata on Query {
//     siteMetadata: config {
//       id
//       url
//       name
//       title
//       description
//       slogan
//       keywords
//       author {
//         name
//         email
//         url
//       }
//       language
//       cover {
//         ...SiteCoverImage
//       }
//       navigation {
//         text
//         link
//       }
//       socials {
//         name
//         link
//       }
//       links {
//         text
//         link
//       }
//       subscription {
//         name
//         qrcode
//       }
//       card {
//         image {
//           ...PostCardImage
//         }
//       }
//       disqus {
//         shortname
//       }
//     }
//   }
// `
