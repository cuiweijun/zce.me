/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'

import { Container, Link, Button, Input } from '../components'

const query = graphql`
  query FooterComponent {
    meta: config {
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

    tags: allTag {
      nodes {
        name
        permalink
      }
    }
  }
`

const Widget = ({ title, width, children }) => (
  <section sx={{ width: width, mb: [4, 4, 4, 0], px: 3 }}>
    <h4
      sx={{
        fontSize: 'lg',
        fontWeight: 'light',
        mt: 0,
        mb: 2
      }}
      children={title}
    />
    {children}
  </section>
)

const Follow = ({ socials }) => (
  <Widget title="Follow me" width={['100%', '100%', '100%', '45%']}>
    <p sx={{ mb: 3 }}>
      Get all the latest &amp; greatest posts delivered straight to your inbox.
    </p>
    <form
      sx={{
        display: 'flex',
        mb: 3
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
          px: 3,
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: 'currentColor'
        }}
      />
    </form>
    <ul
      sx={{
        m: 0,
        mx: -1,
        mb: 3,
        p: 0,
        listStyle: 'none'
      }}>
      {socials.map(i => (
        <li key={i.name} sx={{ display: 'inline-block', mx: 1, mb: 2 }}>
          <Button
            as={Link}
            to={i.link || '/'}
            title={i.name}
            target="_blank"
            rel="noopener noreferrer"
            color="border"
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
    <ul sx={{ m: 0, p: 0, listStyle: 'none', lineHeight: 'loose' }}>
      {tags.map(i => (
        <li
          key={i.name}
          sx={{
            display: 'inline-block',
            ':not(:last-child):after': {
              content: '"\\002C"',
              mr: 1
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
    <ul sx={{ m: 0, px: 2, listStyle: 'none' }}>
      {links.map(i => (
        <li
          key={i.text}
          sx={{
            ':before': {
              content: '"\\279F"',
              mr: 1
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
    <img
      alt={subscription.name}
      title={subscription.name}
      src={subscription.qrcode.childImageSharp.fixed.src}
      srcSet={subscription.qrcode.childImageSharp.fixed.srcSet}
      sx={{ display: 'block !important', mx: 'auto' }}
    />
  </Widget>
)

const Copyright = ({ name, url }) => (
  <div
    sx={{
      display: 'flex',
      flexDirection: ['column', 'row'],
      pt: 3,
      borderTop: 1,
      borderColor: 'border'
    }}>
    <span>
      &copy; {new Date().getFullYear()} <Link to={url}>{name}</Link>. All Rights
      Reserved.
    </span>
    <ul sx={{ flexGrow: 1, m: 0, mx: 2, p: 0 }}>
      <li sx={{ display: 'inline-block', mr: 1 }}>
        <Link to="/privacy-policy/">Privacy Policy</Link>
      </li>
      <li sx={{ display: 'inline-block', mr: 1 }}>
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
        sx={{ mx: 1 }}
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
        sx={{ mx: 1 }}
      />
    </span>
  </div>
)

export default () => {
  const { meta, tags } = useStaticQuery(query)

  return (
    <footer
      sx={{
        py: 7,
        borderTop: 1,
        borderColor: 'border',
        bg: 'background',
        color: 'muted',
        fontSize: 'sm',
        textAlign: ['center', 'left'],
        transition: 'background 0.3s, border 0.3s'
      }}>
      <Container>
        <aside sx={{ display: 'flex', flexWrap: 'wrap', mx: -3, mb: 4 }}>
          <Follow socials={meta.socials} />
          <Tags tags={tags.nodes} />
          <Links links={meta.links} />
          <Subscription subscription={meta.subscription} />
        </aside>
        <Copyright name={meta.name} url={meta.url} />
      </Container>
    </footer>
  )
}
