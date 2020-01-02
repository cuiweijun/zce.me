/**
 * Site footer
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Link from '../components/link'
import Input from '../components/input'
import Button from '../components/button'
import Row from '../components/row'
import Container from '../components/container'

const query = graphql`
  query FooterComponent {
    meta: config {
      url
      name
      socials {
        name
        icon
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

    tags: allTag(limit: 16) {
      nodes {
        name
        permalink
      }
    }
  }
`

const Widget = ({ title, width, children }) => (
  <section sx={{ width: width, mb: 4, px: 3 }}>
    <h4 sx={{ fontWeight: 'light', mb: 2 }} children={title} />
    {children}
  </section>
)

const Follow = ({ socials }) => (
  <Widget title="社交媒体" width={['100%', null, null, '45%']}>
    <p sx={{ mb: 3 }}>我们会将最新的、最有意思的内容直接发送到您的收件箱。</p>
    <form sx={{ display: 'flex', mb: 3 }}>
      <Input
        type="email"
        name="email"
        placeholder="输入您的邮箱"
        autoComplete="off"
        aria-label="输入您的邮箱"
        aria-describedby="btn_send"
        sx={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Button
        color="border"
        variant="outline"
        icon="send"
        id="btn_send"
        aria-label="订阅"
        sx={{
          px: 3,
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: 'currentColor'
        }}
      />
    </form>
    <ul sx={{ mx: -1, pl: 0, listStyle: 'none' }}>
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
            icon={i.icon}
            sx={{ color: 'currentColor' }}
          />
        </li>
      ))}
    </ul>
  </Widget>
)

const Tags = ({ tags }) => (
  <Widget title="标签" width={['100%', null, '55%', '25%']}>
    <ul sx={{ pl: 0, listStyle: 'none', lineHeight: 'loose' }}>
      {tags.map(i => (
        <li
          key={i.name}
          sx={{
            display: 'inline-block',
            mr: 1,
            ':after': { content: '"\\002C"' }
          }}>
          <Link
            to={i.permalink}
            children={i.name}
            sx={{ ':before': { content: '"\\0023"' } }}
          />
        </li>
      ))}
      <li sx={{ display: 'inline-block' }}>
        <Link to="/tags/" children="更多 &rarr;" />
      </li>
    </ul>
  </Widget>
)

const Links = ({ links }) => (
  <Widget title="链接" width={['100%', '50%', '25%', '15%']}>
    <ul sx={{ px: 1, listStyle: 'none' }}>
      {links.map(i => (
        <li
          key={i.text}
          sx={{ ':before': { content: '"\\279F"', mr: 1, opacity: 0.7 } }}>
          <Link to={i.link} children={i.text} />
        </li>
      ))}
    </ul>
  </Widget>
)

const Subscription = ({ subscription }) => (
  <Widget title="订阅" width={['100%', '50%', '20%', '15%']}>
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
      &copy; {new Date().getFullYear()} <Link to={url} children={name} />.
      保留所有权利.
    </span>
    <ul sx={{ flex: 1, mb: 0, ml: 2, pl: 0 }}>
      <li sx={{ display: 'inline', mr: 2 }}>
        <Link to="/privacy-policy/" children="隐私政策" />
      </li>
      <li sx={{ display: 'inline', mr: 2 }}>
        <Link to="/terms-of-service/" children="服务条款" />
      </li>
    </ul>
    <span
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link
        to="https://github.com/zce/zce.me"
        title="查看源代码"
        target="_blank"
        rel="noopener noreferrer"
        children="&lt;/&gt;"
        sx={{ mr: 1 }}
      />
      with
      {/* prettier-ignore */}
      <svg viewBox="0 0 50 50" width="22" height="22" aria-hidden="true">
        <g transform="translate(25 25)">
          <path fill="#fa5252" d="M10.9-20.2c-4.5,0-8.5,2.3-10.9,5.8c-2.4-3.5-6.3-5.8-10.9-5.8c-7.3,0-13.1,5.8-13.1,13C-24,5.7-3.7,11.9,0,20.2C3.7,11.9,24,5.8,24-7.2C24-14.4,18.2-20.2,10.9-20.2">
            <animateTransform attributeName="transform" calcMode="spline" type="scale" values="0.68;0.8;0.6;0.7200000000000001;0.68;0.6400000000000001" keyTimes="0;0.05;0.39;0.45;0.6;1" keySplines="0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1" dur="1s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
      by
      <Link
        to="https://zce.me"
        title="由 zce 创作"
        target="_blank"
        rel="noopener noreferrer"
        children="zce"
        sx={{ ml: 1 }}
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
        <Row as="aside">
          <Follow socials={meta.socials} />
          <Tags tags={tags.nodes} />
          <Links links={meta.links} />
          <Subscription subscription={meta.subscription} />
        </Row>
        <Copyright name={meta.name} url={meta.url} />
      </Container>
    </footer>
  )
}
