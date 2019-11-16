/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { graphql, navigate } from 'gatsby'
import Helmet from 'react-helmet'
import moment from 'moment'

import { Layout, Container, Row, Tabs, Link, Comments } from '../components'

const Player = ({ current, fields }) => {
  const playerEl = useRef(null)
  useEffect(() => {
    import('plyr').then(m => {
      // TODO: need multi sources?
      const player = new m.default(playerEl.current, { autoplay: true })
      player.source = { type: 'video', ...fields.sections[current] }
      player.on('ended', e => {
        // const instance = e.detail.plyr
        if (current + 1 === fields.sections.length) return
        const next = `${fields.permalink}${('0' + (current + 2)).substr(-2)}/`
        setTimeout(() => navigate(next), 2000)
      })
    })
  })

  return <video ref={playerEl} />
  // sx={{ maxHeight: t => `calc(100vh - ${t.sizes.nav})` }}
}

const Main = ({ current, course, url }) => (
  <Tabs initial={1} sx={{ flex: '3 1 32rem', padding: 3, minHeight: '60vh' }}>
    <section id="intro" name="简介">
      <div
        sx={{ marginBottom: 4, paddingX: 3, paddingY: 4 }}
        dangerouslySetInnerHTML={{ __html: course.html }}
      />
    </section>
    <section id="toc" name="目录">
      <ol
        sx={{
          padding: 0,
          paddingY: 3,
          listStyle: 'inside decimal-leading-zero',
          a: { color: 'inherit' }
        }}>
        {course.fields.sections.map((item, i) => (
          <li
            key={item.title}
            sx={{
              paddingX: 3,
              paddingY: 2,
              fontSize: i === current || 'sm',
              color: i === current && 'primary',
              ':not(:last-child)': { borderBottomWidth: 1 },
              a: { textDecoration: 'none' }
            }}>
            {i === current ? (
              <span>▶ {item.title}</span>
            ) : (
              <Link to={`${course.fields.permalink}${('0' + ++i).substr(-2)}/`}>
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </section>
    {course.fields.comment && (
      <section id="talk" name="讨论">
        <div sx={{ padding: 3 }}>
          <Comments
            url={url}
            slug={course.fields.slug}
            title={course.fields.title}
          />
        </div>
      </section>
    )}
  </Tabs>
)

const AsideSection = ({ title, children }) => (
  <section
    sx={{
      padding: 3,
      ':not(:last-child)': {
        borderBottomWidth: 1
      }
    }}>
    <span sx={{ fontWeight: 'bold' }}>{title}: </span>
    {children}
  </section>
)

const Aside = ({ video, fields, related }) => (
  <aside
    sx={{
      position: 'sticky',
      top: 0,
      // alignSelf: 'flex-start',
      padding: 3,
      paddingLeft: [3, 3, 0],
      borderLeftWidth: 1,
      color: 'muted',
      a: {
        color: 'inherit',
        ':not(:last-child)': {
          marginRight: 1,
          ':after': {
            content: '"\\002C"'
          }
        }
      }
    }}>
    {video && (
      <AsideSection title="课程">
        <Link to={fields.permalink} title={fields.title}>
          《{fields.title}》
        </Link>
      </AsideSection>
    )}
    <AsideSection title="作者">
      {fields.authors.map(i => (
        <Link key={i.name} to={i.permalink} title={i.name}>
          {i.name}
        </Link>
      ))}
    </AsideSection>
    <AsideSection title="发布时间">
      <time dateTime={fields.date} aria-label="Posted on">
        {moment.utc(fields.date).format('ll')}
      </time>
    </AsideSection>
    <AsideSection title="最后更新">
      <time dateTime={fields.updated} aria-label="Updated on">
        {moment.utc(fields.updated).format('ll')}
      </time>
    </AsideSection>
    <AsideSection title="分类">
      {fields.categories.map(i => (
        <Link key={i.name} to={i.permalink} title={i.name}>
          {i.name}
        </Link>
      ))}
    </AsideSection>
    {fields.tags && (
      <AsideSection title="标签">
        {fields.tags.map(i => (
          <Link key={i.name} to={i.permalink} title={i.name}>
            {i.name}
          </Link>
        ))}
      </AsideSection>
    )}
    <AsideSection title="相关推荐">
      <ul>
        {related.nodes.map(i => (
          <li key={i.id}>
            <Link to={i.fields.permalink} title={i.fields.title}>
              {i.fields.title}
            </Link>
          </li>
        ))}
      </ul>
    </AsideSection>
  </aside>
)

export default ({
  data: { course, related, meta },
  pageContext: { current },
  location: { pathname }
}) => {
  const { fields } = course
  const video = fields.sections[current]
  return (
    <Layout
      title={video ? video.title : fields.title}
      subtitle={fields.description}
      description={fields.description || course.excerpt}
      cover={video ? false : fields.cover}
      hero={video ? false : undefined}
      mask={1}
      align="left"
      background="background">
      <Helmet>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />
      </Helmet>

      {video && <Player current={current} fields={fields} />}

      <Container>
        <Row>
          <Main current={current} course={course} url={meta.url + pathname} />
          <Aside video={video} fields={fields} related={related} />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query CourseTemplate($id: String!, $cat: String) {
    meta: config {
      url
    }

    course: markdownRemark(id: { eq: $id }) {
      fields {
        title
        slug
        date
        updated
        cover {
          ...CoverImage
        }
        description
        permalink
        comment
        sections {
          title
          sources {
            size
            src
          }
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
      excerpt(pruneLength: 160)
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
