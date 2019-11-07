/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, useColorMode } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'

import Container from './container'
import Button from './button'

// #region query
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
      # cover {
      #   ...SiteCoverImage
      # }
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
      # subscription {
      #   name
      #   qrcode {
      #     ...QRCodeImage
      #   }
      # }
    }

    allTag {
      nodes {
        name
        permalink
      }
    }
  }
`
// #endregion

const SkipLink = props => (
  <a
    {...props}
    href="#content"
    children="Skip to content"
    sx={{
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      m: -1,
      p: 0,
      overrflow: 'hidden',
      position: 'absolute',
      top: -9999,
      ':focus': {
        position: 'fixed',
        zIndex: 4,
        top: 0,
        left: 0,
        m: 2,
        p: 3,
        fontWeight: 'bold',
        color: 'black',
        bg: 'white',
        width: 'auto',
        height: 'auto',
        clip: 'auto'
      }
    }}
  />
)

const Brand = ({ name }) => (
  <Link
    to="/"
    sx={{
      display: 'flex',
      alignItems: 'center',
      py: 1,
      color: 'inherit',
      fontSize: 'large'
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 472 450"
      sx={{
        width: 'logo',
        height: 'logo',
        mr: '2'
      }}>
      <defs>
        <filter
          id="shadow"
          x="-12.7%"
          y="-13.4%"
          width="125.4%"
          height="126.7%"
          filterUnits="objectBoundingBox">
          <feOffset in="SourceAlpha" result="offset-outer" />
          <feGaussianBlur
            stdDeviation="20"
            in="offset-outer"
            result="blue-outer"
          />
          <feComposite
            in="blue-outer"
            in2="SourceAlpha"
            operator="out"
            result="blue-outer"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            in="blue-outer"
          />
        </filter>
      </defs>
      <mask id="mask" fill="#fff">
        <path d="M472 114.26L203.029 335.74H407.1L472 449.48H64.9L0 335.74l268.971-221.48H64.9L0 .52h407.1z" />
      </mask>
      <g mask="url(#mask)" fill="#339AF0">
        <path d="M0 0h472v449H0z" />
      </g>
      <g mask="url(#mask)">
        <path
          d="M0 335.74l64.9 113.74L472 114.26 407.1.52z"
          filter="url(#shadow)"
        />
      </g>
    </svg>
    <span>{name}</span>
  </Link>
)

const Menu = ({ items }) => (
  <ul
    sx={{
      display: 'flex',
      flex: '1 0',
      m: 0,
      mx: 3,
      px: 1,
      listStyle: 'none'
    }}>
    {items.map(i => (
      <li key={i.link}>
        <Link
          to={i.link}
          sx={{
            display: 'block',
            p: 2,
            color: 'inherit',
            opacity: 0.75,
            ':hover, &[aria-current=page]': {
              opacity: 1
            }
          }}>
          {i.text}
        </Link>
      </li>
    ))}
  </ul>
)

const ColorModeToggler = props => {
  const [mode, setMode] = useColorMode()
  return (
    <Button
      sx={{
        width: 32,
        height: 32,
        p: 1,
        borderRadius: 'circle'
      }}
      variant="transparent"
      onClick={e => setMode(mode === 'default' ? 'dark' : 'default')}
      title={`Toggle ${mode === 'default' ? 'Dark' : 'Light'} Mode`}>
      <svg viewBox="0 0 32 32" fill="currentcolor">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
      </svg>
    </Button>
  )
}

const Search = props => (
  <form>
    <input type="search" placeholder="Search (not yet)" autoComplete="off" />
  </form>
)

export default props => {
  const { siteMetadata } = useStaticQuery(query)
  return (
    <Fragment>
      <SkipLink />
      <header>
        <nav
          sx={{
            bg: 'dark',
            color: 'light'
          }}>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 'nav'
            }}>
            <Brand name={siteMetadata.name} />
            <Menu items={siteMetadata.navigation} />
            <Search />
            <ColorModeToggler />
          </Container>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer></footer>
    </Fragment>
  )
}
