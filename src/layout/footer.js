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
          borderLeft: 'none',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: 'currentColor'
        }}
      />
    </form>
    <ul
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        marginX: -1,
        marginBottom: 3,
        padding: 0,
        listStyle: 'none'
      }}>
      {socials.map(i => (
        <li key={i.name}>
          <Button
            to={i.link || '/'}
            title={i.name}
            target="_blank"
            rel="noopener noreferrer"
            color="gray"
            variant="outline"
            icon={i.name.toLowerCase()}
            sx={{
              marginX: 1,
              marginBottom: 2,
              color: 'currentColor'
            }}
          />
        </li>
      ))}
    </ul>
  </Widget>
)

const Tags = ({ tags }) => (
  <Widget title="Tags" width={['100%', '100%', '55%', '25%']}>
    <ul sx={{ margin: 0, padding: 0, listStyle: 'none' }}>
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
              color: 'inherit',
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
          <Link to={i.link} sx={{ color: 'inherit' }}>
            {i.text}
          </Link>
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

const Heart = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <g transform="translate(28 28)">
      <path
        sx={{ fill: 'accent' }}
        d="M4.6-20C1-20-2.1-18.2-4-15.4c-1.9-2.8-5-4.6-8.6-4.6C-18.4-20-23-15.4-23-9.7C-23,0.5-6.9,5.4-4,12
      C-1.1,5.4,15,0.6,15-9.7C15-15.4,10.4-20,4.6-20">
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
)

const Copyright = ({ name, url }) => (
  <div
    sx={{
      display: 'flex',
      borderTop: 'default',
      borderColor: 'border',
      paddingTop: 3
    }}>
    <span>
      &copy; {new Date().getFullYear()}{' '}
      <Link to={url} sx={{ color: 'inherit' }}>
        {name}
      </Link>
      . All Rights Reserved.
    </span>
    <ul sx={{ flexGrow: 1, margin: 0, marginX: 2, padding: 0 }}>
      <li sx={{ display: 'inline-block', marginRight: 1 }}>
        <Link to="/privacy-policy/" sx={{ color: 'inherit' }}>
          Privacy Policy
        </Link>
      </li>
      <li sx={{ display: 'inline-block', marginRight: 1 }}>
        <Link to="/terms-of-service/" sx={{ color: 'inherit' }}>
          Terms of Service
        </Link>
      </li>
    </ul>
    <span sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        to="https://github.com/zce/zce.me"
        title="Visit the Source"
        target="_blank"
        rel="noopener noreferrer"
        children="&lt;/&gt;"
        sx={{ marginRight: 1, color: 'inherit' }}
      />
      with
      <Heart sx={{ width: 'icon', height: 'icon' }} />
      by
      <Link
        to="https://zce.me"
        variant="inherit"
        target="_blank"
        rel="noopener noreferrer"
        children="zce"
        sx={{ marginLeft: 1, color: 'inherit' }}
      />
    </span>
  </div>
)

export default () => {
  const { siteMetadata, allTag } = useStaticQuery(query)

  return (
    <footer
      sx={{
        borderTop: 'default',
        borderColor: 'border',
        paddingY: 7,
        backgroundColor: 'light',
        color: 'muted',
        fontSize: 'sm',
        textAlign: ['center', 'center', 'left']
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
