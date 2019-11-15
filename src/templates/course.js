/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { graphql, navigate } from 'gatsby'
import Helmet from 'react-helmet'
import moment from 'moment'

import {
  Layout,
  Container,
  Row,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  Link,
  Comments
} from '../components'

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

export default ({
  data: {
    course: { fields, excerpt, html },
    related,
    meta
  },
  pageContext: { current },
  location: { pathname }
}) => {
  const video = fields.sections[current]

  const playerEl = useRef(null)

  useEffect(() => {
    if (!video) return
    import('plyr').then(m => {
      // TODO: need multi sources?
      const player = new m.default(playerEl.current, { autoplay: true })
      player.source = {
        type: 'video',
        title: video.name,
        sources: video.sources
      }
      player.on('ended', e => {
        // const instance = e.detail.plyr
        if (current < fields.sections.length) {
          setTimeout(() => {
            navigate(`${fields.permalink}${('0' + (current + 2)).substr(-2)}/`)
          }, 3000)
        }
      })
    })
  })

  return (
    <Layout
      title={video ? video.name : fields.title}
      subtitle={fields.description}
      description={fields.description || excerpt}
      cover={video ? false : fields.cover}
      hero={video ? false : undefined}
      mask={1}
      align="left"
      background="background">
      {video && (
        <video
          ref={playerEl}
          sx={{ maxHeight: t => `calc(100vh - ${t.sizes.nav})` }}
        />
      )}

      <Helmet>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />
      </Helmet>

      <Container>
        <Row>
          <Tabs
            defaultIndex={1}
            sx={{
              flex: '3 1 32rem',
              padding: 3,
              minHeight: '60vh'
            }}>
            <TabList>
              <Tab>介绍</Tab>
              <Tab>目录</Tab>
              {fields.comment && <Tab>讨论</Tab>}
            </TabList>
            <TabPanel>
              <div
                sx={{ marginBottom: 4, paddingX: 3, paddingY: 4 }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </TabPanel>
            <TabPanel>
              <ol
                sx={{
                  padding: 0,
                  paddingY: 3,
                  listStyle: 'inside decimal-leading-zero',

                  a: {
                    color: 'inherit'
                  }
                }}>
                {fields.sections.map((item, i) => (
                  <li
                    key={item.name}
                    sx={{
                      paddingX: 3,
                      paddingY: 2,
                      fontSize: i === current || 'sm',
                      color: i === current && 'primary',
                      ':not(:last-child)': {
                        borderBottomWidth: 1
                      },
                      a: {
                        textDecoration: 'none'
                      }
                    }}>
                    {i === current ? (
                      <span>▶ {item.name}</span>
                    ) : (
                      <Link
                        to={`${fields.permalink}${('0' + ++i).substr(-2)}/`}>
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </TabPanel>
            {fields.comment && (
              <TabPanel>
                <div
                  sx={{
                    padding: 3
                  }}>
                  <Comments
                    url={meta.url + pathname}
                    slug={fields.slug}
                    title={fields.title}
                  />
                </div>
              </TabPanel>
            )}
          </Tabs>
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
          name
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
