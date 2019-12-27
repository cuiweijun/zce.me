/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, navigate } from 'gatsby'
import moment from 'moment'

import {
  Layout,
  Container,
  Row,
  Tabs,
  Link,
  // Button,
  Comments,
  Player
} from '../components'

const pad = i => ('0' + (i + 1)).substr(-2)

const getVideoLink = (p, i) => `${p}${pad(i)}/`

const Main = ({ current, course }) => (
  <Tabs
    initial={1}
    sx={{
      flex: '3 1 32rem',
      p: 3,
      borderRight: 1,
      borderColor: 'border',
      transition: 'border 0.3s'
    }}>
    <section id="intro" name="简介">
      <div
        sx={{ mb: 4, px: 3, py: 4, lineHeight: 'loose' }}
        dangerouslySetInnerHTML={{ __html: course.html }}
      />
    </section>
    <section id="toc" name="目录">
      <div
        sx={{
          py: 3,
          a: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 2,
            borderBottom: 1,
            borderColor: 'border',
            textDecoration: 'none',
            lineHeight: 'loose',
            transition: 'border 0.3s',
            ':last-child': {
              border: 0
            }
          },
          span: {
            color: 'muted'
          }
        }}>
        {course.fields.sections.map((item, i) => (
          <Link key={i} to={getVideoLink(course.fields.permalink, i)}>
            {i === current ? '▶ ' : `${pad(i)}. `}
            {item.title}
            <span>{moment(item.duration * 1000).format('mm:ss')}</span>
            {/* <Button size="sm" children="开始学习" /> */}
          </Link>
        ))}
      </div>
    </section>
    {course.fields.comment && (
      <section id="talk" name="讨论">
        <Comments
          type="course"
          slug={course.fields.slug}
          title={course.fields.title}
          excerpt={course.excerpt}
          permalink={course.fields.permalink}
          sx={{ px: 3 }}
        />
      </section>
    )}
  </Tabs>
)

const AsideSection = ({ title, children }) => (
  <section
    sx={{
      p: 3,
      ':not(:last-child)': {
        borderBottom: 1,
        borderColor: 'border',
        transition: 'border 0.3s'
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
      // top: t => t.sizes.nav, // TODO
      top: 0,
      alignSelf: 'flex-start',
      flex: '1 1 16rem',
      p: 3,
      pl: [3, 3, 0],
      color: 'muted',
      a: {
        ':not(:last-child)': {
          mr: 1,
          ':after': {
            content: '"\\002C"'
          }
        }
      }
    }}>
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
        {moment.utc(fields.date).format('ll')}
      </time>
    </AsideSection>
    <AsideSection title="最后更新">
      <time
        dateTime={fields.updated}
        title={fields.updated}
        aria-label="Updated on">
        {moment.utc(fields.updated).format('ll')}
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
      <ul>
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
  const { fields } = course
  const video = fields.sections[current]
  const onEnded = () => {
    if (current + 1 === fields.sections.length) return
    const next = getVideoLink(fields.permalink, current + 1)
    setTimeout(() => navigate(next), 2000)
  }
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
      {video && (
        <Player
          {...video}
          autoplay={true}
          onEnded={onEnded}
          sx={{ maxHeight: t => `calc(100vh - ${t.sizes.nav})` }}
        />
      )}
      <Container>
        <Row>
          <Main current={current} course={course} />
          <Aside video={video} fields={fields} related={related} />
        </Row>
      </Container>
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
          ...CoverImage
        }
        description
        permalink
        comment
        sections {
          title
          duration
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
