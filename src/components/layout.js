import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import SkipLink from './skip-link'
import Container from './container'

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

const Header = props => <Box as="header" {...props} />

const Nav = props => <Box as="nav" {...props} height="nav" bg="dark" />

const Logo = props => (
  <Box
    as="svg"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 472 450">
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
  </Box>
)

const Brand = props => (
  <Link as={GatsbyLink} display="flex" alignItems="center" py={2} to="/">
    <Logo mr="2" size="logo" />
    <Text as="span" color="white" fontSize={4}>
      {props.name}
    </Text>
  </Link>
)

const Menu = props => (
  <Flex as="ul" variant="nav">
    {props.items.map(i => (
      <li key={i.link}>
        <Link as={GatsbyLink} to={i.link} variant="navItem">
          {i.text}
        </Link>
      </li>
    ))}
  </Flex>
)

const Main = props => <Box as="main" id="content" {...props} />

const Footer = props => <Box as="footer" {...props} />

export default props => {
  const { siteMetadata, allTag } = useStaticQuery(query)

  return (
    <>
      <SkipLink />
      <Header>
        <Nav>
          <Container display="flex" height="100%" alignItems="center">
            <Brand name={siteMetadata.name} />
            <Menu items={siteMetadata.navigation} />
          </Container>
        </Nav>
      </Header>
      <Main>{props.children}</Main>
      <Footer></Footer>
    </>
  )
}
