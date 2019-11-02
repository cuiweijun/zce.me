import React, { useState, useEffect, useRef } from 'react'
import { graphql, navigate, Link } from 'gatsby'
import moment from 'moment'
import 'plyr/dist/plyr.css'

import { Layout, Comments } from '../components'

export default ({ pageContext, data, location }) => {
  const { course, relatedCourses, siteMetadata } = data
  const { current } = pageContext
  const { fields } = course

  const video = fields.sections[current]

  const url = siteMetadata.url + location.pathname

  let hash = location.hash.substr(1)
  if (video) {
    hash = 'toc'
  } else if (!['intro', 'toc', 'talk'].includes(hash)) {
    hash = 'intro'
  }
  const [panel, setPanel] = useState(hash)

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
      className={`course ${fields.slug}`}
      title={video ? video.name : fields.title}
      description={fields.description || course.excerpt}
      cover={video ? false : fields.cover}
      header={video ? false : undefined}
      location={location}>
      {video && <video className="fffffffffff" ref={playerEl} />}

      <div className="container">
        <div className="row">
          <section className="course-content">
            <ul className="tabs" role="tablist">
              <li className={panel === 'intro' ? ' active' : ''}>
                <a
                  id="intro-tab"
                  href="#intro"
                  onClick={() => setPanel('intro')}
                  role="tab"
                  aria-controls="intro"
                  aria-selected={panel === 'intro'}>
                  介绍
                </a>
              </li>
              <li className={panel === 'toc' ? ' active' : ''}>
                <a
                  id="toc-tab"
                  href="#toc"
                  onClick={() => setPanel('toc')}
                  role="tab"
                  aria-controls="toc"
                  aria-selected={panel === 'toc'}>
                  目录
                </a>
              </li>
              {fields.comment && (
                <li className={panel === 'talk' ? ' active' : ''}>
                  <a
                    id="talk-tab"
                    href="#talk"
                    onClick={() => setPanel('talk')}
                    role="tab"
                    aria-controls="talk"
                    aria-selected={panel === 'talk'}>
                    讨论
                  </a>
                </li>
              )}
            </ul>
            <div className="tab-content">
              <div
                id="intro"
                className={`tab-panel${panel === 'intro' ? ' active' : ''}`}
                role="tabpanel"
                aria-labelledby="intro-tab">
                <div
                  className="course-intro"
                  dangerouslySetInnerHTML={{ __html: course.html }}
                />
              </div>
              <div
                id="toc"
                className={`tab-panel${panel === 'toc' ? ' active' : ''}`}
                role="tabpanel"
                aria-labelledby="toc-tab">
                <ol className="course-toc">
                  {fields.sections.map((item, i) =>
                    i === current ? (
                      <li className="active" key={item.name}>
                        <span>▶ {item.name}</span>
                      </li>
                    ) : (
                      <li key={item.name}>
                        <Link
                          to={`${fields.permalink}${('0' + ++i).substr(-2)}/`}>
                          {item.name}
                        </Link>
                      </li>
                    )
                  )}
                </ol>
              </div>
              {fields.comment && (
                <div
                  id="talk"
                  className={`tab-panel${panel === 'talk' ? ' active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="talk-tab">
                  <div className="course-talk">
                    <Comments
                      url={url}
                      slug={fields.slug}
                      title={fields.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
          <aside className="course-meta">
            {video && (
              <section>
                <span>课程：</span>
                <Link to={fields.permalink}>《{fields.title}》</Link>
              </section>
            )}
            <section>
              <span>作者：</span>
              {fields.authors.map(i => (
                <Link key={i.name} to={i.permalink}>
                  {i.name}
                </Link>
              ))}
            </section>
            <section>
              <span>发布时间：</span>
              <time dateTime={fields.date} aria-label="Posted on">
                {moment.utc(fields.date).format('ll')}
              </time>
            </section>
            <section>
              <span>最后更新：</span>
              <time dateTime={fields.updated} aria-label="Updated on">
                {moment.utc(fields.updated).format('ll')}
              </time>
            </section>
            <section>
              <span>分类：</span>
              {fields.categories.map(i => (
                <Link key={i.name} to={i.permalink}>
                  {i.name}
                </Link>
              ))}
            </section>
            {fields.tags && (
              <section>
                <span>标签：</span>
                {fields.tags.map(i => (
                  <Link key={i.name} to={i.permalink}>
                    {i.name}
                  </Link>
                ))}
              </section>
            )}
            <section>
              <span>相关推荐：</span>
              <ul>
                {relatedCourses.nodes.map(i => (
                  <li key={i.id}>
                    <Link to={i.fields.permalink} title={i.fields.title}>
                      {i.fields.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
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
        updated
        cover {
          ...SiteCoverImage
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

    relatedCourses: allMarkdownRemark(
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

    siteMetadata: config {
      url
    }
  }
`
