import React from 'react'
import {
  Box,
  Flex,
  List,
  ListItem,
  Link,
  IconButton,
  useColorMode
} from '@chakra-ui/core'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'

import { Container } from '../components'
import { useNavPinned } from '../utils/hooks'

const query = graphql`
  query HeaderComponent {
    siteMetadata: config {
      url
      name
      navigation {
        text
        link
      }
    }
  }
`

const Brand = ({ name }) => (
  <Link
    as={GatsbyLink}
    to="/"
    display="flex"
    alignItems="center"
    paddingX="1"
    fontSize="xl"
    _hover={null}>
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 472 450"
      size="logo"
      marginRight="2">
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
    <Flex as="span">{name}</Flex>
  </Link>
)

const Menu = ({ items }) => (
  <List display="flex" flexGrow="1" marginX="3" paddingX="1">
    {items.map(i => (
      <ListItem key={i.link}>
        {/* TODO: current page */}
        <Link
          as={GatsbyLink}
          to={i.link}
          padding="2"
          opacity="0.75"
          _hover={{ opacity: 1 }}>
          {i.text}
        </Link>
      </ListItem>
    ))}
  </List>
)

const ColorModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      variant="ghost"
      size="sm"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? 'moon' : 'sun'}
    />
  )
}

export default props => {
  const pinned = useNavPinned()
  const { siteMetadata } = useStaticQuery(query)

  return (
    <Box as="header" position="relative">
      <Box
        as="nav"
        position="fixed"
        zIndex="sticky"
        width="full"
        borderBottomWidth="1px"
        background="inheiht"
        transform={`translateY(${pinned ? '0%' : '-100%'})`}
        transition="transform 0.3s linear"
        willChange="transform">
        <Container display="flex" alignItems="center" height="nav">
          <Brand name={siteMetadata.name} />
          <Menu items={siteMetadata.navigation} />
          {/* <Search /> */}
          <ColorModeToggler />
        </Container>
      </Box>
      <Box height="nav" aria-hidden="true" />
    </Box>
  )
}

export const GraphQLFragment = graphql`
  # Load layout cover image required data.
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
