/**
 * https://reactjs.org/docs/hooks-intro.html
 */

import { useState, useEffect } from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

// hooks/use-pinned.js

let lastScrollY = 0

export const usePinned = (initial = true, offset = 200, tolerance = 10) => {
  const [pinned, setPinned] = useState(initial)
  // const [lastScrollY, setLastScrollY] = useState(0)

  const setStatus = value => pinned !== value && setPinned(value)

  const handleScroll = () => {
    const distance = window.scrollY - lastScrollY

    // no scroll
    if (!distance) return

    // setLastScrollY(window.scrollY)
    lastScrollY = window.scrollY

    if (window.scrollY < offset) {
      return setStatus(initial)
    }

    if (Math.abs(distance) < tolerance) return

    setStatus(distance <= 0)
  }

  useEffect(() => {
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
