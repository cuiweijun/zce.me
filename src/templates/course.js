import React from 'react'
import { graphql, navigate } from 'gatsby'

import {
  Layout,
  Container,
  Tabs,
  Link,
  Hero,
  Cover,
  Comments,
  Player
} from '../components'

const pad = n => ('0' + Math.floor(n)).substr(-2)

const getVideoLink = (p, i) => `${p}${pad(i + 1)}/`

const formatDuration = d => `${pad(d / 60)}:${pad(d % 60)}`

const Main = ({ current, fields, excerpt, html }) => (
  <Tabs
    initial={1}
    css={t => ({
      flex: '3 1 32rem',
      padding: t.space[3],
      borderRight: `1px solid ${t.colors.border}`
    })}
  >
    <section id="intro" name="简介">
      <div
        css={t => ({
          marginBottom: t.space[4],
          padding: `${t.space[4]} ${t.space[3]}`,
          lineHeight: t.lineHeights.loose
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
    <section id="toc" name="目录">
      <div
        css={t => ({
          padding: `${t.space[3]} 0`,
          counterReset: 'video',
          a: {
            display: 'flex',
            alignItems: 'center',
            padding: `${t.space[2]} ${t.space[3]}`,
            borderBottom: `1px solid ${t.colors.border}`,
            textDecoration: 'none',
            lineHeight: t.lineHeights.loose,
            ':last-child': {
              border: 0
            }
          },
          small: {
            marginLeft: 'auto',
            fontFamily: t.fonts.mono,
            color: t.colors.muted
          }
        })}
      >
        {fields.sections.map((item, i) => (
          <Link key={i} to={getVideoLink(fields.permalink, i)}>
            {i === current ? `▶ ${item.title}` : `${pad(i + 1)}. ${item.title}`}
            <small>{formatDuration(item.duration)}</small>
          </Link>
        ))}
      </div>
    </section>
    {fields.comment && (
      <section id="talk" name="讨论">
        <Comments
          type="course"
          slug={fields.slug}
          title={fields.title}
          excerpt={excerpt}
          permalink={fields.permalink}
          css={t => ({ padding: `0 ${t.space[3]}` })}
        />
      </section>
    )}
  </Tabs>
)

const AsideSection = ({ title, children }) => (
  <section
    css={t => ({
      padding: t.space[3],
      ':not(:last-child)': {
        borderBottom: `1px solid ${t.colors.border}`
      }
    })}
  >
    <span css={t => ({ fontWeight: t.fontWeights.bold })}>{title}: </span>
    {children}
  </section>
)

const Aside = ({ video, fields, related }) => (
  <aside
    css={t => ({
      position: 'sticky',
      top: 0,
      alignSelf: 'flex-start',
      flex: '1 1 16rem',
      padding: t.space[3],
      lineHeight: t.lineHeights.loose,
      color: t.colors.muted,
      a: {
        ':not(:last-child)': {
          marginRight: t.space[1],
          ':after': {
            content: '"\\002C"'
          }
        }
      },
      [t.screens.lg]: {
        paddingLeft: 0
      }
    })}
  >
    {video && (
      <AsideSection title="课程">
        <Link to={fields.permalink}>《{fields.title}》</Link>
      </AsideSection>
    )}
    <AsideSection title="作者">
      {fields.authors.map(i => (
        <Link key={i.name} to={i.permalink}>
          {i.name}
        </Link>
      ))}
    </AsideSection>
    <AsideSection title="发布时间">
      <time dateTime={fields.date} title={fields.date} aria-label="Posted on">
        {fields.formatDate}
      </time>
    </AsideSection>
    <AsideSection title="最后更新">
      <time
        dateTime={fields.updated}
        title={fields.updated}
        aria-label="Updated on"
      >
        {fields.formatUpdated}
      </time>
    </AsideSection>
    <AsideSection title="分类">
      {fields.categories.map(i => (
        <Link key={i.name} to={i.permalink}>
          {i.name}
        </Link>
      ))}
    </AsideSection>
    {fields.tags && (
      <AsideSection title="标签">
        {fields.tags.map(i => (
          <Link key={i.name} to={i.permalink}>
            {i.name}
          </Link>
        ))}
      </AsideSection>
    )}
    <AsideSection title="相关推荐">
      <ul css={t => ({ marginTop: t.space[2] })}>
        {related.nodes.map(i => (
          <li key={i.id}>
            <Link to={i.fields.permalink}>{i.fields.title}</Link>
          </li>
        ))}
      </ul>
    </AsideSection>
  </aside>
)

export default ({ data: { course, related }, pageContext: { current } }) => {
  const { fields, excerpt, html } = course
  const video = fields.sections[current]
  const onEnded = () => {
    if (current + 1 === fields.sections.length) return
    const next = getVideoLink(fields.permalink, current + 1)
    setTimeout(() => navigate(next), 2000)
  }
  return (
    <Layout
      title={video ? video.title : fields.title}
      description={fields.description || excerpt}
    >
      {!video && <Cover image={fields.cover} type={Cover.types.mask} />}
      {!video && (
        <Hero
          title={video ? video.title : fields.title}
          subtitle={fields.description}
          css={{ textAlign: 'left' }}
        />
      )}
      {video && (
        <Player
          {...video}
          autoplay
          onEnded={onEnded}
          css={t => ({ maxHeight: `calc(100vh - ${t.sizes.nav})` })}
        />
      )}
      <section css={t => ({ background: t.colors.background })}>
        <Container row>
          <Main
            current={current}
            fields={fields}
            excerpt={excerpt}
            html={html}
          />
          <Aside video={video} fields={fields} related={related} />
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query CourseTemplate($id: String!, $cat: String) {
    course: markdownRemark(id: { eq: $id }) {
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
        sections {
          title
          duration
          source
        }
        authors {
          name
          avatar {
            childImageSharp {
              fixed(width: 160) {
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

    related: allMarkdownRemark(
      filter: {
        id: { ne: $id }
        fields: {
          type: { eq: "course" }
          draft: { eq: false }
          private: { eq: false }
          categories: { elemMatch: { id: { eq: $cat } } }
        }
      }
      sort: { fields: fields___date, order: DESC }
      limit: 5
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
