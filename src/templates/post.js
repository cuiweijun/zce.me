import React from 'react'
import { graphql } from 'gatsby'

import {
  Layout,
  Container,
  Image,
  Avatar,
  Link,
  Icon,
  Button,
  Hero,
  Cover,
  Card,
  Comments,
  ScreenReaderText
} from '../components'
import { loadScript } from '../utils'

const Header = ({ title, date, formatDate, category }) => (
  <Hero sx={{ pt: '6vw', pb: '4vw' }}>
    <span sx={{ textTransform: 'uppercase' }}>
      <time dateTime={date} title={date} aria-label="发表于">
        {formatDate}
      </time>
      <span
        role="separator"
        aria-hidden="true"
        sx={{
          ':before': {
            display: 'inline-block',
            mx: 2,
            content: '"\\002f"',
            opacity: 0.6
          }
        }}
      />
      <Link to={category.permalink} aria-label="发表在">
        {category.name}
      </Link>
    </span>
    <h1 children={title} sx={{ fontSize: [7, 8], lineHeight: 'normal' }} />
  </Hero>
)

const Figure = ({ cover, title }) => (
  <Image
    Tag="figure"
    file={cover}
    alt={title}
    title={title}
    sx={{
      mx: [-3, 0],
      overflow: 'visible !important',
      bg: 'dark',
      ':before,:after': {
        display: ['none', 'block'],
        position: 'absolute',
        top: '10%',
        zIndex: -1,
        width: '1rem',
        height: '120%',
        background: 'rgba(0, 0, 0, 0.2)',
        content: '""',
        filter: 'blur(1rem)'
      },
      ':before': {
        left: '-0.5rem',
        transform: 'rotate(-1deg)'
      },
      ':after': {
        right: '-0.5rem',
        transform: 'rotate(1deg)'
      }
    }}
  />
)

const Content = ({ html }) => {
  React.useEffect(() => {
    // prevent image link
    const links = document.querySelectorAll('.gatsby-resp-image-link')
    links.forEach(item => {
      item.onclick = e => e.preventDefault()
    })
    // zoom
    let zoom = null
    loadScript(`/assets/zoom.js?v=${process.env.GATSBY_STATIC_VERSION}`).then(
      () => {
        zoom = window.mediumZoom('.gatsby-resp-image-image', {
          margin: 20,
          background: '#000'
        })
      }
    )
    return () => zoom && zoom.detach()
  })

  return (
    <section
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        mx: [-3, 0],
        px: ['5%', '10%'],
        py: ['4%', '6%'],
        minHeight: '80vh',
        bg: 'background',
        fontSize: 'calc(100% + 0.1vw)',
        // fontFamily: 'serif',
        lineHeight: 'double',
        wordWrap: 'break-word',
        'h1, h2, h3, h4, h5, h6': {
          m: '1.4em 0 0.8em'
        },
        '.gatsby-resp-image-wrapper': {
          my: '5%',
          maxWidth: '860px !important'
        },
        '.footnotes': {
          p: {
            display: 'inline'
          }
        }
      }}
    />
  )
}

const More = ({ tags, date, updated, formatUpdated, title, url }) => (
  <section
    sx={{
      display: 'flex',
      mb: 3,
      py: 2,
      borderBottom: 1,
      color: 'muted',
      fontSize: 'sm'
    }}>
    {date !== updated && (
      <div title="更新于" aria-label="更新于" sx={{ mr: 3 }}>
        <Icon name="edit-3" />
        <time dateTime={updated} title={updated} sx={{ ml: 1 }}>
          {formatUpdated}
        </time>
      </div>
    )}
    {tags.length > 0 && (
      <div title="标记为" aria-label="标记为">
        <Icon name="tag" />
        <ul sx={{ display: 'inline', mb: 0, ml: 1, pl: 0, listStyle: 'none' }}>
          {tags.map(i => (
            <li
              key={i.name}
              sx={{
                display: 'inline',
                ':not(:last-child)': {
                  mr: 1,
                  ':after': {
                    content: '"\\002c"'
                  }
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
      </div>
    )}
    <div
      aria-label="分享到"
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: 'auto',
        span: { mr: 1 },
        a: { ml: 1 }
      }}>
      <span>分享到:</span>
      <Link
        to={`https://twitter.com/share?text=${title}&url=${url}`}
        title="分享到推特"
        target="_blank"
        rel="noopener noreferrer">
        <Icon name="twitter" />
      </Link>
      <Link
        to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        title="分享到脸书"
        target="_blank"
        rel="noopener noreferrer">
        <Icon name="facebook" />
      </Link>
      <Link
        to={`http://qr.topscan.com/api.php?text=${url}`}
        title="分享到朋友圈"
        target="_blank"
        rel="noopener noreferrer">
        <Icon name="aperture" />
      </Link>
    </div>
  </section>
)

const Authors = ({ authors }) => (
  <section sx={{ mb: 7 }}>
    <ScreenReaderText as="h3">作者</ScreenReaderText>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        py: 4
      }}>
      <Avatar
        name={authors[0].name}
        image={authors[0].avatar}
        sx={{ mr: 3, size: 96, boxShadow: 'light' }}
      />
      <div sx={{ flex: '1 1 6rem' }}>
        <h4>{authors[0].name}</h4>
        {authors[0].bio && <p>{authors[0].bio}</p>}
      </div>
      <Button
        as={Link}
        to={authors[0].permalink}
        variant="ghost"
        children="阅读更多"
      />
    </div>
    {authors.length > 1 && (
      <p
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: 'sm',
          fontFamily: 'serif',
          span: { mr: 1 },
          'a:not(:last-child)': {
            mr: 1,
            ':after': {
              content: '"\\002c"'
            }
          }
        }}>
        <span>贡献者:</span>
        {authors.slice(1).map(i => (
          <Link key={i.name} to={i.permalink} children={i.name} />
        ))}
      </p>
    )}
  </section>
)

const License = () => (
  <section sx={{ mb: 7, textAlign: 'center' }}>
    <ScreenReaderText as="h3">许可</ScreenReaderText>
    <Link
      to="https://creativecommons.org/licenses/by-sa/4.0/"
      title="View license"
      target="_blank"
      rel="noopener noreferrer">
      {/* prettier-ignore */}
      <svg viewBox="0 0 120 42" width="160" aria-hidden="true">
        <path fill="currentColor" d="M117.8,0H2.2C1,0,0,1,0,2.2v39.2C0,41.8,0.2,42,0.5,42h119c0.3,0,0.5-0.2,0.5-0.5V2.2C120,1,119,0,117.8,0z M2.2,1h115.5c0.7,0,1.2,0.6,1.2,1.2c0,0,0,15.8,0,27.2H36.4c-3,5.5-8.9,9.2-15.5,9.2c-6.7,0-12.5-3.7-15.5-9.2H1C1,18.1,1,2.2,1,2.2C1,1.6,1.6,1,2.2,1z" />
        <path sx={{ fill: 'background' }} d="M61,32.7c0.3,0,0.6,0,0.9,0.1c0.3,0.1,0.5,0.1,0.7,0.3c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.5,0.2,0.8S63.1,35,63,35.2c-0.2,0.2-0.4,0.4-0.7,0.5c0.4,0.1,0.7,0.3,0.9,0.6s0.3,0.6,0.3,1.1c0,0.3-0.1,0.6-0.2,0.9c-0.1,0.2-0.3,0.4-0.5,0.6c-0.2,0.2-0.5,0.3-0.8,0.3c-0.3,0.1-0.6,0.1-0.9,0.1h-1.2h-2v-6.6L61,32.7L61,32.7z M60.8,35.4c0.3,0,0.5-0.1,0.6-0.2c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2,0-0.3-0.1-0.4c-0.1-0.1-0.1-0.2-0.2-0.2c-0.1-0.1-0.2-0.1-0.3-0.1s-0.2,0-0.4,0h-1.4v1.5H60.8z M60.9,38.2c0.1,0,0.3,0,0.4,0c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.2-0.2,0.2-0.3c0.1-0.1,0.1-0.3,0.1-0.4c0-0.3-0.1-0.6-0.3-0.7c-0.2-0.1-0.4-0.2-0.8-0.2h-1.6v1.8L60.9,38.2L60.9,38.2z M63.7,32.7h1.6l1.6,2.6l1.5-2.6H70l-2.5,4.1v2.5H66v-2.6L63.7,32.7z M87.3,37.7c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.1,0.3,0.2,0.5,0.2s0.4,0.1,0.6,0.1c0.1,0,0.3,0,0.4,0s0.3-0.1,0.4-0.1c0.1-0.1,0.2-0.1,0.3-0.3c0.1-0.1,0.1-0.2,0.1-0.4s-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.2-0.4-0.3c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.5-0.1-0.7-0.2c-0.2-0.1-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.2-0.6-0.3s-0.3-0.3-0.4-0.5C86,35.1,86,34.9,86,34.6c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.6-0.6c0.2-0.2,0.5-0.3,0.8-0.4c0.3-0.1,0.6-0.1,0.9-0.1s0.7,0,1,0.1s0.6,0.2,0.8,0.4c0.2,0.2,0.4,0.4,0.6,0.7c0.1,0.3,0.2,0.6,0.2,1h-1.4c0-0.2-0.1-0.4-0.1-0.5c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.4-0.2c-0.2,0-0.3,0-0.5,0c-0.1,0-0.2,0-0.4,0c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0.1-0.2,0.1-0.2,0.2c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.1,0,0.2,0.1,0.3c0,0.1,0.1,0.2,0.3,0.2c0.1,0.1,0.3,0.1,0.6,0.2c0.3,0.1,0.6,0.2,1,0.3c0.1,0,0.3,0.1,0.5,0.1c0.2,0.1,0.4,0.2,0.7,0.3c0.2,0.1,0.4,0.3,0.6,0.6c0.2,0.2,0.2,0.5,0.2,0.9c0,0.3-0.1,0.6-0.2,0.8c-0.1,0.3-0.3,0.5-0.5,0.7s-0.5,0.3-0.9,0.4c-0.3,0.1-0.7,0.2-1.2,0.2c-0.4,0-0.7,0-1.1-0.1c-0.3-0.1-0.6-0.2-0.9-0.4s-0.5-0.4-0.6-0.7c-0.2-0.3-0.2-0.6-0.2-1.1h1.4C87.1,37.4,87.2,37.6,87.3,37.7z M95.5,32.7l2.5,6.6h-1.5L96,37.8h-2.5L93,39.3h-1.5l2.5-6.6H95.5zM95.6,36.8l-0.8-2.4l0,0l-0.9,2.4H95.6z" />
        <circle fill="transparent" cx="92.3" cy="15.03" r="11.6" />
        <path fill="currentColor" d="M87.078,13.346c0.438-2.931,2.501-4.491,5.065-4.491c3.689,0,5.941,2.682,5.941,6.237c0,3.492-2.376,6.174-6.003,6.174c-2.501,0-4.69-1.497-5.128-4.552h2.939c0.063,1.559,1.126,2.121,2.564,2.121c1.626,0,2.751-1.497,2.751-3.867c0-2.432-0.938-3.742-2.689-3.742c-1.251,0-2.376,0.437-2.626,2.058h0.876l-2.314,2.307l-2.314-2.307L87.078,13.346z M92.269,3.43c-3.189,0-5.941,1.122-8.129,3.368C81.826,9.105,80.7,11.849,80.7,15.03s1.126,5.863,3.439,8.17c2.314,2.245,5.003,3.43,8.129,3.43c3.189,0,5.941-1.123,8.317-3.43c2.189-2.183,3.314-4.864,3.314-8.108s-1.126-5.987-3.377-8.232C98.272,4.491,95.521,3.43,92.269,3.43z M92.269,5.488c2.626,0,4.877,0.936,6.691,2.806c1.876,1.809,2.814,4.054,2.814,6.736c0,2.682-0.938,4.864-2.751,6.611c-1.939,1.871-4.19,2.806-6.754,2.806s-4.815-0.936-6.691-2.806c-1.876-1.871-2.814-4.116-2.814-6.673s0.938-4.802,2.877-6.736C87.391,6.424,89.642,5.488,92.269,5.488z" />
        <circle fill="transparent" cx="63.3" cy="15.03" r="11.6" />
        <path fill="currentColor" d="M66.5,12.13c0-0.4-0.3-0.7-0.7-0.7H61c-0.4,0-0.7,0.3-0.7,0.7v4.7h1.3v5.6h3.6v-5.6h1.3V12.13L66.5,12.13z M63.3,7.53c0.9,0,1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6S62.4,7.53,63.3,7.53z M63.3,3.43c-3.2,0-5.9,1.1-8.2,3.4s-3.4,5.1-3.4,8.2c0,3.2,1.1,5.9,3.4,8.2c2.3,2.3,5,3.4,8.2,3.4s6-1.1,8.3-3.4c2.2-2.2,3.3-4.9,3.3-8.1s-1.1-6-3.4-8.2C69.3,4.53,66.6,3.43,63.3,3.43z M63.4,5.53c2.6,0,4.9,0.9,6.7,2.8c1.9,1.8,2.8,4.1,2.8,6.7c0,2.7-0.9,4.9-2.7,6.6c-1.9,1.9-4.2,2.8-6.8,2.8c-2.6,0-4.8-0.9-6.7-2.8s-2.8-4.1-2.8-6.7s0.9-4.8,2.8-6.7C58.5,6.43,60.7,5.53,63.4,5.53z" />
        <circle fill="transparent" cx="21" cy="19" r="15.75" />
        <path fill="currentColor" d="M32.174,7.825c3.08,3.08,4.575,6.775,4.575,11.175s-1.496,8.095-4.487,11.087C29.094,33.254,25.311,34.75,21,34.75s-8.007-1.584-11.086-4.663S5.25,23.311,5.25,19c0-4.311,1.584-8.007,4.663-11.175C12.905,4.746,16.6,3.25,21,3.25S29.182,4.746,32.174,7.825z M11.937,9.849C9.385,12.489,8.066,15.48,8.066,19c0,3.424,1.166,6.349,3.579,8.855c2.237,2.323,5.288,3.778,8.508,3.967c3.874,0.227,7.244-1.092,9.998-3.846c2.464-2.376,3.695-5.367,3.695-9.063c0-3.608-1.232-6.687-3.783-9.151c-2.552-2.552-5.543-3.784-9.151-3.784C17.48,6.066,14.489,7.297,11.937,9.849z M18.8,17.504c-0.352-0.88-0.968-1.32-1.76-1.32c-1.408,0-2.112,0.968-2.112,2.816c0,1.848,0.704,2.816,2.112,2.816c0.88,0,1.584-0.44,1.936-1.408l1.936,1.056c-0.88,1.672-2.288,2.464-4.135,2.464c-1.408,0-2.552-0.44-3.431-1.32s-1.32-2.024-1.32-3.608c0-1.496,0.44-2.728,1.32-3.608s1.936-1.32,3.255-1.32c1.936,0,3.343,0.792,4.135,2.288L18.8,17.504zM27.775,17.504c-0.352-0.88-0.968-1.32-1.76-1.32c-1.408,0-2.112,0.968-2.112,2.816c0,1.848,0.704,2.816,2.112,2.816c0.88,0,1.584-0.44,1.936-1.408l1.936,1.056c-0.88,1.672-2.288,2.464-4.135,2.464c-1.408,0-2.552-0.44-3.431-1.32C21.439,21.728,21,20.584,21,19c0-1.496,0.44-2.728,1.32-3.608s1.936-1.32,3.343-1.32c1.936,0,3.343,0.792,4.135,2.288L27.775,17.504z" />
      </svg>
    </Link>
    <p sx={{ mt: 2, color: 'muted', fontStyle: 'italic', fontFamily: 'serif' }}>
      本作品采用
      <Link
        to="https://creativecommons.org/licenses/by-sa/4.0/"
        title="View license"
        target="_blank"
        rel="noopener noreferrer">
        《知识共享署名-相同方式共享 4.0 国际许可协议》
      </Link>
      进行许可
    </p>
  </section>
)

const Footer = ({ fields, excerpt, url }) => (
  <footer sx={{ mx: 'auto', py: '3vw', maxWidth: 'inner' }}>
    <More
      tags={fields.tags}
      date={fields.date}
      updated={fields.updated}
      formatUpdated={fields.formatUpdated}
      title={fields.title}
      url={url}
    />
    <Authors authors={fields.authors} />
    <License />
    {fields.comment && (
      <section sx={{ mb: 7 }}>
        <ScreenReaderText as="h3">评论</ScreenReaderText>
        <Comments
          type="post"
          slug={fields.slug}
          title={fields.title}
          excerpt={excerpt}
          permalink={fields.permalink}
        />
      </section>
    )}
  </footer>
)

const Category = ({ name, category, related }) => (
  <section
    sx={{
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      flex: '1 1',
      flexBasis: ['100%', null, null, '20rem'],
      flexDirection: 'column',
      mx: 3,
      mb: 6,
      p: 5,
      borderRadius: 'medium',
      bg: 'dark',
      color: 'white',
      boxShadow: 'light',
      textAlign: 'center',
      a: {
        textDecoration: 'none'
      }
    }}>
    <small
      sx={{
        color: 'rgba(255, 255, 255, 0.5)',
        ':before, :after': {
          display: 'inline-block',
          mx: 2,
          content: '"\\2014\\2014"',
          color: 'rgba(255, 255, 255, 0.25)'
        }
      }}>
      {name}
    </small>
    <h3 sx={{ p: 2, fontWeight: 'light' }}>
      <Link to={category.permalink}>{category.name}</Link>
    </h3>
    {/* prettier-ignore */}
    <svg viewBox="0 0 24 24" width="50" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ margin: '0 auto' }}>
      <path d="M13 14.5s2 3 5 3 5.5-2.463 5.5-5.5S21 6.5 18 6.5c-5 0-7 11-12 11C2.962 17.5.5 15.037.5 12S3 6.5 6 6.5s4.5 3.5 4.5 3.5" />
    </svg>
    <ul sx={{ flex: 1, m: 3, pl: 0, listStyle: 'none' }}>
      {related.nodes.map(item => (
        <li
          key={item.id}
          sx={{
            p: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            ':not(:last-child)': {
              borderBottom: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}>
          <Link to={item.fields.permalink} title={item.fields.title}>
            {item.fields.title}
          </Link>
        </li>
      ))}
    </ul>
    <footer>
      <Link to={category.permalink}>查看更多文章 &rarr;</Link>
    </footer>
  </section>
)

const RelatedPosts = ({ name, category, related, prev, next }) => (
  <aside sx={{ pt: 6, bg: 'light' }}>
    <Container row>
      <ScreenReaderText as="h3">相关文章</ScreenReaderText>
      <Category name={name} category={category} related={related} />
      {prev && <Card post={prev} rel="prev" />}
      {next && <Card post={next} rel="next" />}
    </Container>
  </aside>
)

export default ({ data: { post, prev, next, related, meta }, location }) => (
  <Layout
    title={post.fields.title}
    description={post.fields.description || post.excerpt}
    prev={prev && prev.fields.permalink}
    next={next && next.fields.permalink}
    type="article">
    <Cover image={post.fields.cover} type={3} />
    <Container as="article" role="main" sx={{ mb: 5 }}>
      <Header
        title={post.fields.title}
        date={post.fields.date}
        formatDate={post.fields.formatDate}
        category={post.fields.categories[0]}
      />
      <Figure cover={post.fields.cover} title={post.fields.title} />
      <Content html={post.html} />
      <Footer
        fields={post.fields}
        excerpt={post.excerpt}
        url={meta.url + location.pathname}
      />
    </Container>
    <RelatedPosts
      name={meta.name}
      category={post.fields.categories[0]}
      related={related}
      prev={prev}
      next={next}
    />
  </Layout>
)

export const query = graphql`
  query PostTemplate($id: String!, $cat: String, $prev: String, $next: String) {
    meta: config {
      url
      name
    }

    post: markdownRemark(id: { eq: $id }) {
      fields {
        title
        slug
        date
        formatDate: date(formatString: "ll", locale: "zh-cn")
        updated
        formatUpdated: updated(formatString: "ll", locale: "zh-cn")
        cover {
          ...CoverImage
        }
        description
        permalink
        comment
        authors {
          name
          avatar {
            childImageSharp {
              fixed(width: 96) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          bio
          permalink
        }
        categories {
          name
          permalink
        }
        tags {
          name
          permalink
        }
      }
      excerpt(pruneLength: 160, truncate: true)
      html
    }

    prev: markdownRemark(id: { eq: $prev }) {
      ...Card
    }

    next: markdownRemark(id: { eq: $next }) {
      ...Card
    }

    related: allMarkdownRemark(
      filter: {
        id: { ne: $id }
        fields: {
          type: { eq: "post" }
          draft: { eq: false }
          private: { eq: false }
          categories: { elemMatch: { id: { eq: $cat } } }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 3
    ) {
      totalCount
      nodes {
        id
        fields {
          permalink
          title
        }
      }
    }
  }
`
