/**
 * Site footer
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Link from './link'
import Input from './input'
import Button from './button'
import Row from './row'
import Container from './container'

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
        qrcode
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
  <section
    css={t => ({
      width: '100%',
      marginBottom: t.space[4],
      paddingLeft: t.space[3],
      paddingRight: t.space[3],
      [t.screens.sm]: width[0] && {
        width: width[0]
      },
      [t.screens.md]: width[1] && {
        width: width[1]
      },
      [t.screens.lg]: width[2] && {
        width: width[2]
      }
    })}
  >
    <h4
      css={t => ({ fontWeight: t.fontWeights.light, marginBottom: t.space[2] })}
      children={title}
    />
    {children}
  </section>
)

const Follow = ({ socials }) => (
  <Widget title="社交媒体" width={[null, null, '45%']}>
    <p css={t => ({ marginBottom: t.space[3] })}>
      我们会将最新的、最有意思的内容直接发送到您的收件箱。
    </p>
    <form css={t => ({ display: 'flex', marginBottom: t.space[3] })}>
      <Input
        type="email"
        name="email"
        placeholder="输入您的邮箱（尚未实现）"
        autoComplete="off"
        aria-label="输入您的邮箱"
        aria-describedby="btn_send"
        css={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Button
        color="border"
        variant="outline"
        icon="send"
        id="btn_send"
        aria-label="订阅"
        css={t => ({
          paddingLeft: t.space[3],
          paddingRight: t.space[3],
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: 'currentColor'
        })}
      />
    </form>
    <ul
      css={t => ({
        marginLeft: '-' + t.space[1],
        marginRight: '-' + t.space[1],
        paddingLeft: 0,
        listStyle: 'none'
      })}
    >
      {socials.map(i => (
        <li
          key={i.name}
          css={t => ({
            display: 'inline-block',
            marginLeft: t.space[1],
            marginRight: t.space[1],
            marginBottom: t.space[2]
          })}
        >
          <Button
            as={Link}
            to={i.link || '/'}
            title={i.name}
            target="_blank"
            rel="noopener noreferrer"
            color="border"
            variant="outline"
            icon={i.icon}
            css={{ color: 'currentColor' }}
          />
        </li>
      ))}
    </ul>
  </Widget>
)

const Tags = ({ tags }) => (
  <Widget title="标签" width={[null, '55%', '25%']}>
    <ul
      css={t => ({
        padding: 0,
        listStyle: 'none',
        lineHeight: t.lineHeights.loose
      })}
    >
      {tags.map(i => (
        <li
          key={i.name}
          css={t => ({
            display: 'inline-block',
            marginRight: t.space[1],
            ':after': { content: '"\\002C"' }
          })}
        >
          <Link
            to={i.permalink}
            children={i.name}
            css={{ ':before': { content: '"\\0023"' } }}
          />
        </li>
      ))}
      <li css={{ display: 'inline-block' }}>
        <Link to="/tags/" children="更多 &rarr;" />
      </li>
    </ul>
  </Widget>
)

const Links = ({ links }) => (
  <Widget title="链接" width={['50%', '25%', '15%']}>
    <ul css={t => ({ paddingLeft: t.space[1], listStyle: 'none' })}>
      {links.map(i => (
        <li
          key={i.text}
          css={t => ({
            ':before': {
              content: '"\\279F"',
              marginRight: t.space[1],
              opacity: 0.7
            }
          })}
        >
          <Link to={i.link} children={i.text} />
        </li>
      ))}
    </ul>
  </Widget>
)

const Subscription = ({ subscription }) => (
  <Widget title="订阅" width={['50%', '20%', '15%']}>
    <img
      alt={subscription.name}
      title={subscription.name}
      src={subscription.qrcode}
      css={{ display: 'block', margin: '0 auto', width: 140 }}
    />
  </Widget>
)

const Copyright = ({ name, url }) => (
  <div
    css={t => ({
      display: 'flex',
      flexDirection: 'column',
      padding: `${t.space[3]} 0`,
      borderTop: `1px solid ${t.colors.border}`,
      [t.screens.sm]: {
        flexDirection: 'row'
      }
    })}
  >
    <span>
      &copy; {new Date().getFullYear()} <Link to={url} children={name} />.
      保留所有权利.
    </span>
    <ul
      css={t => ({
        flex: 1,
        marginBottom: 0,
        marginLeft: t.space[2],
        paddingLeft: 0
      })}
    >
      <li css={t => ({ display: 'inline', marginRight: t.space[2] })}>
        <Link to="/privacy-policy/" children="隐私政策" />
      </li>
      <li css={t => ({ display: 'inline', marginRight: t.space[2] })}>
        <Link to="/terms-of-service/" children="服务条款" />
      </li>
    </ul>
    <span
      css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Link
        to="https://github.com/zce/zce.me"
        title="查看源代码"
        target="_blank"
        rel="noopener noreferrer"
        children="&lt;/&gt;"
        css={t => ({ marginRight: t.space[1] })}
      />
      with
      {/* prettier-ignore */}
      <svg viewBox="0 0 50 50" width="22" height="22">
        <title>heart</title>
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
        css={t => ({ marginLeft: t.space[1] })}
      />
    </span>
  </div>
)

export default () => {
  const { meta, tags } = useStaticQuery(query)

  return (
    <footer
      css={t => ({
        paddingTop: t.space[7],
        borderTop: `1px solid ${t.colors.border}`,
        background: t.colors.background,
        color: t.colors.muted,
        fontSize: t.fontSizes.sm,
        textAlign: 'center',
        [t.screens.sm]: {
          textAlign: 'left'
        }
      })}
    >
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
