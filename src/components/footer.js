import React from 'react'
import {
  Box,
  Flex,
  List,
  ListItem,
  Heading,
  Text,
  Link,
  Input,
  IconButton,
  FormControl
} from '@chakra-ui/core'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { keyframes } from '@emotion/core'

import { Container } from '../components'

const query = graphql`
  query FooterComponent {
    siteMetadata: config {
      url
      name
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
        qrcode {
          childImageSharp {
            fixed(width: 128, height: 128) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }

    allTag {
      nodes {
        name
        permalink
      }
    }
  }
`

const Widget = ({ title, width, children }) => (
  <Box as="section" width={width} marginBottom={[4, 4, 4, 0]} paddingX="4">
    <Heading
      as="h4"
      size="md"
      fontWeight="light"
      marginBottom="2"
      children={title}
    />
    {children}
  </Box>
)

const Follow = ({ socials }) => (
  <Widget title="Follow me" width={['full', 'full', 'full', 5 / 12]}>
    <Flex marginBottom="3">
      Get all the latest &amp; greatest posts delivered straight to your inbox.
    </Flex>
    <FormControl display="flex" marginBottom="3">
      <Input
        type="email"
        name="email"
        placeholder="Input your email"
        autoComplete="off"
        aria-label="Input your email"
        aria-describedby="btn_send"
      />
      <IconButton
        icon="send"
        variant="outline"
        marginLeft="1"
        id="btn_send"
        aria-label="Subscribe">
        Submit
      </IconButton>
    </FormControl>
    <List>
      {socials.map(i => (
        <ListItem key={i.name} display="inline-block">
          <IconButton
            as="a"
            href={i.link}
            title={i.name}
            target="_blank"
            rel="noopener noreferrer"
            icon={i.name.toLowerCase()}
            size="sm"
            variant="outline"
            marginRight="2"
            marginBottom="2"
          />
        </ListItem>
      ))}
      {/* <ListItem>
        <IconButton
          as="a"
          href={`https://feedly.com/i/subscription/feed/http://wedn.net:2368/rss/`}
          title={i.name}
          target="_blank"
          rel="noopener noreferrer"
          icon={i.name.toLowerCase()}
        />
      </ListItem> */}
    </List>
  </Widget>
)

const Tags = ({ tags }) => (
  <Widget title="Tags" width={['full', 'full', 1 / 3, 3 / 12]}>
    <List paddingX="1">
      {tags.map(i => (
        <ListItem
          key={i.name}
          display="inline-block"
          _after={{
            content: '"\\002C"',
            marginRight: 1
          }}
          _last={{ ':after': { display: 'none' } }}>
          <Link
            as={GatsbyLink}
            to={i.permalink}
            _before={{
              content: '"\\0023"'
            }}>
            {i.name}
          </Link>
        </ListItem>
      ))}
    </List>
  </Widget>
)

const Links = ({ links }) => (
  <Widget title="Links" width={['full', 1 / 2, 1 / 3, 2 / 12]}>
    <List paddingX="1">
      {links.map(i => (
        <ListItem
          key={i.text}
          _before={{
            content: '"\\279F"',
            marginRight: 1
          }}>
          <Link as={GatsbyLink} to={i.link}>
            {i.text}
          </Link>
        </ListItem>
      ))}
    </List>
  </Widget>
)

const Subscription = ({ subscription }) => (
  <Widget title="Subscription" width={['full', 1 / 2, 1 / 3, 2 / 12]}>
    <Image
      fixed={subscription.qrcode.childImageSharp.fixed}
      alt={subscription.name}
      title={subscription.name}
    />
  </Widget>
)

const Copyright = ({ name, url }) => (
  <Flex borderTopWidth="1px" paddingTop="3">
    <Text as="span">
      &copy; {new Date().getFullYear()} <a href={url}>{name}</a>. All Rights
      Reserved.
    </Text>
    <List flexGrow="1" marginX="2">
      <ListItem display="inline-block" marginRight="1">
        <Link as={GatsbyLink} to="/privacy-policy/">
          Privacy Policy
        </Link>
      </ListItem>
      <ListItem display="inline-block" marginRight="1">
        <Link as={GatsbyLink} to="/terms-of-service/">
          Terms of Service
        </Link>
      </ListItem>
    </List>
    <Text>
      <Link
        href="https://github.com/zce/zce.me"
        title="Visit the Source"
        target="_blank"
        rel="noopener noreferrer"
        children="&lt;/&gt;"
      />{' '}
      with{' '}
      <Text
        as="span"
        color="red.400"
        willChange="transform"
        animation={`${keyframes`
          from, to { transform: scale3d(1, 1, 1) }
          50% { transform: scale3d(1.4, 1.4, 1.4) }
        `} 0.4s ease-in-out infinite`}>
        ♥
      </Text>{' '}
      by{' '}
      <Link
        href="https://zce.me"
        target="_blank"
        rel="noopener noreferrer"
        children="zce"
      />
    </Text>
  </Flex>
)

export default props => {
  const { siteMetadata, allTag } = useStaticQuery(query)

  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      paddingY="8"
      color="gray.500"
      fontSize="sm"
      textAlign={['center', 'center', 'left']}>
      <Container>
        <Flex as="aside" flexWrap="wrap" marginBottom="4">
          <Follow socials={siteMetadata.socials} />
          <Tags tags={allTag.nodes} />
          <Links links={siteMetadata.links} />
          <Subscription subscription={siteMetadata.subscription} />
        </Flex>
        <Copyright name={siteMetadata.name} url={siteMetadata.url} />
      </Container>
    </Box>
  )
}
