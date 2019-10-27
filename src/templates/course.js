import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import moment from 'moment'

import { Layout, Comments } from '../components'

export default ({ data, location }) => {
  const { course, relatedCourses, siteMetadata } = data
  const { fields, frontmatter } = course
  const url = siteMetadata.url + location.pathname

  let hash = location.hash.substr(1)
  if (!['intro', 'toc', 'talk'].includes(hash)) {
    hash = 'intro'
  }
  const [panel, setPanel] = useState(hash)

  return (
    <Layout
      className="course"
      title={fields.title}
      description={fields.description || course.excerpt}
      cover={fields.cover}
      location={location}>
      <div className="container">
        <div className="row">
          <section className="course-content">
            <ul className="tabs" role="tablist">
              <li className={panel === 'intro' ? ' active' : ''}>
                <a href="#intro" onClick={() => setPanel('intro')} role="tab">
                  介绍
                </a>
              </li>
              <li className={panel === 'toc' ? ' active' : ''}>
                <a href="#toc" onClick={() => setPanel('toc')} role="tab">
                  目录
                </a>
              </li>
              {fields.comment && (
                <li className={panel === 'talk' ? ' active' : ''}>
                  <a href="#talk" onClick={() => setPanel('talk')} role="tab">
                    讨论
                  </a>
                </li>
              )}
            </ul>
            <div className="tab-content">
              <div
                className={`tab-panel${panel === 'intro' ? ' active' : ''}`}
                role="tabpanel">
                <div
                  className="course-intro"
                  dangerouslySetInnerHTML={{ __html: course.html }}
                />
              </div>
              <div
                className={`tab-panel${panel === 'toc' ? ' active' : ''}`}
                role="tabpanel">
                <ol className="course-toc">
                  {frontmatter.sections.map((item, i) => (
                    <li key={item.name}>
                      <Link to={`${fields.permalink}${i}/`}>{item.name}</Link>
                    </li>
                  ))}
                </ol>
              </div>
              {fields.comment && (
                <div
                  className={`tab-panel${panel === 'talk' ? ' active' : ''}`}
                  role="tabpanel">
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
            <section>
              <span>作者：</span>
              {fields.authors.map(i => (
                <Link key={i.name} to={i.permalink}>
                  {i.name}
                </Link>
              ))}
            </section>
            <section>
              <span>发布于：</span>
              <time dateTime={fields.date} aria-label="Posted on">
                {moment.utc(fields.date).format('ll')}
              </time>
            </section>
            <section>
              <span>最后更新于：</span>
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
      frontmatter {
        sections {
          name
          url
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
