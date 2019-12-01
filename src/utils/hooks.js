/**
 * https://reactjs.org/docs/hooks-intro.html
 */

import { useState, useEffect } from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

// hooks/use-pinned.js
export const usePinned = (initial = true, offset = 200, tolerance = 10) => {
  const [pinned, setPinned] = useState(initial)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < offset) {
        return setPinned(initial)
      }

      const distance = window.scrollY - lastScrollY

      // no scroll
      if (!distance) return

      // last scroll
      setLastScrollY(window.scrollY)

      if (Math.abs(distance) < tolerance) return

      if (distance > 0) {
        pinned && setPinned(false)
      } else {
        pinned || setPinned(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return pinned
}

// // hooks/metadata.js
// export const useMetadata = () => {
//   return useStaticQuery(
//     graphql`
//       query Metadata {
//         metadata: config {
//           url
//           name
//           title
//           description
//           slogan
//           keywords
//           author {
//             name
//             email
//             url
//           }
//           language
//           cover {
//             childImageSharp {
//               fluid {
//                 src
//               }
//             }
//           }
//           navigation {
//             text
//             link
//           }
//           socials {
//             name
//             link
//           }
//           links {
//             text
//             link
//           }
//           subscription {
//             name
//             qrcode {
//               childImageSharp {
//                 fluid {
//                   src
//                 }
//               }
//             }
//           }
//           card {
//             image {
//               childImageSharp {
//                 fluid {
//                   src
//                 }
//               }
//             }
//           }
//           disqus {
//             shortname
//           }
//         }
//       }
//     `
//   ).config
// }
