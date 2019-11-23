/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import { Container, Link, Button, Input } from '../components'

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
  <section sx={{ width: width, marginBottom: [4, 4, 4, 0], paddingX: 3 }}>
    <h4
      sx={{
        fontSize: 'lg',
        fontWeight: 'light',
        marginTop: 0,
        marginBottom: 2
      }}
      children={title}
    />
    {children}
  </section>
)

const Follow = ({ socials }) => (
  <Widget title="Follow me" width={['100%', '100%', '100%', '45%']}>
    <p sx={{ marginBottom: 3 }}>
      Get all the latest &amp; greatest posts delivered straight to your inbox.
    </p>
    <form
      sx={{
        display: 'flex',
        marginBottom: 3
      }}>
      <Input
        type="email"
        name="email"
        placeholder="Input your email"
        autoComplete="off"
        aria-label="Input your email"
        aria-describedby="btn_send"
        sx={{
          flexGrow: 1,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
      />
      <Button
        color="border"
        variant="outline"
        icon="send"
        id="btn_send"
        aria-label="Subscribe"
        sx={{
          paddingX: 3,
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: 'currentColor'
        }}
      />
    </form>
    <ul
      sx={{
        margin: 0,
        marginX: -1,
        marginBottom: 3,
        padding: 0,
        listStyle: 'none'
      }}>
      {socials.map(i => (
        <li
          key={i.name}
          sx={{ display: 'inline-block', marginX: 1, marginBottom: 2 }}>
          <Button
            as={Link}
            to={i.link || '/'}
            title={i.name}
            target="_blank"
            rel="noopener noreferrer"
            color="gray"
            variant="outline"
            icon={i.name.toLowerCase()}
            sx={{ color: 'currentColor' }}
          />
        </li>
      ))}
    </ul>
  </Widget>
)

const Tags = ({ tags }) => (
  <Widget title="Tags" width={['100%', '100%', '55%', '25%']}>
    <ul sx={{ margin: 0, padding: 0, listStyle: 'none', lineHeight: 'loose' }}>
      {tags.map(i => (
        <li
          key={i.name}
          sx={{
            display: 'inline-block',
            ':not(:last-child):after': {
              content: '"\\002C"',
              marginRight: 1
            }
          }}>
          <Link
            to={i.permalink}
            sx={{
              ':before': {
                content: '"\\0023"'
              }
            }}>
            {i.name}
          </Link>
        </li>
      ))}
    </ul>
  </Widget>
)

const Links = ({ links }) => (
  <Widget title="Links" width={['100%', '50%', '25%', '15%']}>
    <ul sx={{ margin: 0, paddingX: 2, listStyle: 'none' }}>
      {links.map(i => (
        <li
          key={i.text}
          sx={{
            ':before': {
              content: '"\\279F"',
              marginRight: 1
            }
          }}>
          <Link to={i.link}>{i.text}</Link>
        </li>
      ))}
    </ul>
  </Widget>
)

const Subscription = ({ subscription }) => (
  <Widget title="Subscription" width={['100%', '50%', '20%', '15%']}>
    <Image
      fixed={subscription.qrcode.childImageSharp.fixed}
      alt={subscription.name}
      title={subscription.name}
      sx={{ display: 'block !important', marginX: 'auto' }}
    />
  </Widget>
)

const Copyright = ({ name, url }) => (
  <div
    sx={{
      display: 'flex',
      flexDirection: ['column', 'row'],
      paddingTop: 3,
      borderTop: 1,
      borderColor: 'border'
    }}>
    <span>
      &copy; {new Date().getFullYear()} <Link to={url}>{name}</Link>. All Rights
      Reserved.
    </span>
    <ul sx={{ flexGrow: 1, margin: 0, marginX: 2, padding: 0 }}>
      <li sx={{ display: 'inline-block', marginRight: 1 }}>
        <Link to="/privacy-policy/">Privacy Policy</Link>
      </li>
      <li sx={{ display: 'inline-block', marginRight: 1 }}>
        <Link to="/terms-of-service/">Terms of Service</Link>
      </li>
    </ul>
    <span
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link
        to="https://github.com/zce/zce.me"
        title="Visit the Source"
        target="_blank"
        rel="noopener noreferrer"
        children="&lt;/&gt;"
        sx={{ marginX: 1 }}
      />
      with
      <svg viewBox="0 0 50 50" width="22" height="22" aria-hidden="true">
        <g transform="translate(25 25)">
          <path
            sx={{ fill: 'accent' }}
            d="M10.9-20.2c-4.5,0-8.5,2.3-10.9,5.8c-2.4-3.5-6.3-5.8-10.9-5.8c-7.3,0-13.1,5.8-13.1,13C-24,5.7-3.7,11.9,0,20.2C3.7,11.9,24,5.8,24-7.2C24-14.4,18.2-20.2,10.9-20.2">
            <animateTransform
              attributeName="transform"
              calcMode="spline"
              type="scale"
              values="0.68;0.8;0.6;0.7200000000000001;0.68;0.6400000000000001"
              keyTimes="0;0.05;0.39;0.45;0.6;1"
              keySplines="0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
      by
      <Link
        to="https://zce.me"
        title="Created by"
        target="_blank"
        children="zce"
        sx={{ marginX: 1 }}
      />
    </span>
  </div>
)

export default () => {
  const { siteMetadata, allTag } = useStaticQuery(query)

  return (
    <footer
      sx={{
        borderTop: 1,
        borderColor: 'border',
        paddingY: 7,
        backgroundColor: 'background',
        color: 'muted',
        fontSize: 'sm',
        textAlign: ['center', 'left'],
        a: {
          color: 'inherit'
        }
      }}>
      <Container>
        <aside
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginX: -3,
            marginBottom: 4
          }}>
          <Follow socials={siteMetadata.socials} />
          <Tags tags={allTag.nodes} />
          <Links links={siteMetadata.links} />
          <Subscription subscription={siteMetadata.subscription} />
        </aside>
        <Copyright name={siteMetadata.name} url={siteMetadata.url} />
      </Container>
    </footer>
  )
}
