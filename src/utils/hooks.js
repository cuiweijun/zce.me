/**
 * https://reactjs.org/docs/hooks-intro.html
 */

import { useState, useEffect } from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

// // hooks/metadata.js
// export const useMetadata = () => {
//   return useStaticQuery(
//     graphql`
//       query SiteMetadataHook {
//         site {
//           ...SiteMetadata
//         }
//       }
//     `
//   ).site.siteMetadata
// }

export const useNavState = (offset = 200, tolerance = 10) => {
  const [state, setState] = useState('')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < offset) {
        return state && setState('')
      }

      const distance = window.scrollY - lastScrollY

      // no scroll
      if (!distance) return

      // last scroll
      setLastScrollY(window.scrollY)

      if (Math.abs(distance) < tolerance) return

      if (distance > 0) {
        state !== 'unpinned' && setState('unpinned')
      } else {
        state !== 'pinned' && setState('pinned')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return state
}
