/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import moment from 'moment'

import {
  Container,
  Layout,
  Row,
  Image,
  Link,
  Icon,
  Button,
  Card,
  Comments,
  ScreenReaderText
} from '../components'

const Meta = ({ title, tags, url }) => (
  <section
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
      fontSize: 'sm'
    }}>
    {tags && (
      <div
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <Icon name="tag" />
        <ul
          sx={{
            margin: 0,
            marginLeft: 1,
            padding: 0,
            listStyle: 'none'
          }}>
          {tags.map(i => (
            <li
              key={i.name}
              sx={{
                display: 'inline',
                ':not(:last-child)': {
                  marginRight: 1,
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        span: {
          marginRight: 1
        },
        a: {
          marginLeft: 1
        }
      }}>
      <span>Share this:</span>
      <Link
        to={`https://twitter.com/share?text=${title}&url=${url}`}
        title="Twitter">
        <Icon name="twitter" />
      </Link>
      <Link
        to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        title="Facebook">
        <Icon name="facebook" />
      </Link>
      <Link to={`http://qr.topscan.com/api.php?text=${url}`} title="Moment">
        <Icon name="aperture" />
      </Link>
    </div>
  </section>
)

const Authors = ({ authors }) => (
  <section
    sx={{
      marginBottom: 7,
      borderTopWidth: 1
    }}>
    <ScreenReaderText as="h3">Author</ScreenReaderText>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingX: 2,
        paddingY: 3
      }}>
      <Image
        file={authors[0].avatar}
        sx={{
          marginRight: 3,
          maxWidth: 'avatar',
          maxHeight: 'avatar',
          borderWidth: 5,
          borderColor: 'gray',
          borderRadius: 'circle'
        }}
      />
      <div sx={{ flex: '1 1 6rem' }}>
        <h4>{authors[0].name}</h4>
        {authors[0].bio && <p>{authors[0].bio}</p>}
      </div>
      <Button as={Link} to={authors[0].permalink} variant="ghost">
        Read More
      </Button>
    </div>
    {authors.length > 1 && (
      <p
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: 'sm',
          fontFamily: 'serif',
          'a:not(:last-child)': {
            marginRight: 1,
            ':after': {
              content: '"\\002c"'
            }
          }
        }}>
        <span>Contributors: </span>
        {authors.slice(1).map(i => (
          <Link key={i.name} to={i.permalink}>
            {i.name}
          </Link>
        ))}
      </p>
    )}
  </section>
)

const License = () => (
  <section
    sx={{
      marginBottom: 7,
      textAlign: 'center',
      fontStyle: 'italic',
      fontFamily: 'serif'
    }}>
    <ScreenReaderText as="h3">License</ScreenReaderText>
    <Link
      to="https://creativecommons.org/licenses/by-sa/4.0/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: 'inherit'
      }}>
      <svg viewBox="0 0 120 42" width="160">
        <path
          fill="#fff"
          d="M3.4,0.5l113.4,0.2c1.6,0,3-0.2,3,3.2l-0.1,37.3H0.5V3.7C0.5,2,0.7,0.5,3.4,0.5z"
        />
        <path
          fill="currentColor"
          d="M117.8,0H2.2C1,0,0,1,0,2.2v39.2C0,41.8,0.2,42,0.5,42h119c0.3,0,0.5-0.2,0.5-0.5V2.2C120,1,119,0,117.8,0z M2.2,1h115.5c0.7,0,1.2,0.6,1.2,1.2c0,0,0,15.8,0,27.2H36.4c-3,5.5-8.9,9.2-15.5,9.2c-6.7,0-12.5-3.7-15.5-9.2H1C1,18.1,1,2.2,1,2.2C1,1.6,1.6,1,2.2,1z"
        />
        <path
          fill="#fff"
          d="M61,32.7c0.3,0,0.6,0,0.9,0.1c0.3,0.1,0.5,0.1,0.7,0.3c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.5,0.2,0.8S63.1,35,63,35.2c-0.2,0.2-0.4,0.4-0.7,0.5c0.4,0.1,0.7,0.3,0.9,0.6s0.3,0.6,0.3,1.1c0,0.3-0.1,0.6-0.2,0.9c-0.1,0.2-0.3,0.4-0.5,0.6c-0.2,0.2-0.5,0.3-0.8,0.3c-0.3,0.1-0.6,0.1-0.9,0.1h-1.2h-2v-6.6L61,32.7L61,32.7z M60.8,35.4c0.3,0,0.5-0.1,0.6-0.2c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2,0-0.3-0.1-0.4c-0.1-0.1-0.1-0.2-0.2-0.2c-0.1-0.1-0.2-0.1-0.3-0.1s-0.2,0-0.4,0h-1.4v1.5H60.8z M60.9,38.2c0.1,0,0.3,0,0.4,0c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.2-0.2,0.2-0.3c0.1-0.1,0.1-0.3,0.1-0.4c0-0.3-0.1-0.6-0.3-0.7c-0.2-0.1-0.4-0.2-0.8-0.2h-1.6v1.8L60.9,38.2L60.9,38.2z M63.7,32.7h1.6l1.6,2.6l1.5-2.6H70l-2.5,4.1v2.5H66v-2.6L63.7,32.7z M87.3,37.7c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.1,0.3,0.2,0.5,0.2s0.4,0.1,0.6,0.1c0.1,0,0.3,0,0.4,0s0.3-0.1,0.4-0.1c0.1-0.1,0.2-0.1,0.3-0.3c0.1-0.1,0.1-0.2,0.1-0.4s-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.2-0.4-0.3c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.5-0.1-0.7-0.2c-0.2-0.1-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.2-0.6-0.3s-0.3-0.3-0.4-0.5C86,35.1,86,34.9,86,34.6c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.6-0.6c0.2-0.2,0.5-0.3,0.8-0.4c0.3-0.1,0.6-0.1,0.9-0.1s0.7,0,1,0.1s0.6,0.2,0.8,0.4c0.2,0.2,0.4,0.4,0.6,0.7c0.1,0.3,0.2,0.6,0.2,1h-1.4c0-0.2-0.1-0.4-0.1-0.5c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.4-0.2c-0.2,0-0.3,0-0.5,0c-0.1,0-0.2,0-0.4,0c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0.1-0.2,0.1-0.2,0.2c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.1,0,0.2,0.1,0.3c0,0.1,0.1,0.2,0.3,0.2c0.1,0.1,0.3,0.1,0.6,0.2c0.3,0.1,0.6,0.2,1,0.3c0.1,0,0.3,0.1,0.5,0.1c0.2,0.1,0.4,0.2,0.7,0.3c0.2,0.1,0.4,0.3,0.6,0.6c0.2,0.2,0.2,0.5,0.2,0.9c0,0.3-0.1,0.6-0.2,0.8c-0.1,0.3-0.3,0.5-0.5,0.7s-0.5,0.3-0.9,0.4c-0.3,0.1-0.7,0.2-1.2,0.2c-0.4,0-0.7,0-1.1-0.1c-0.3-0.1-0.6-0.2-0.9-0.4s-0.5-0.4-0.6-0.7c-0.2-0.3-0.2-0.6-0.2-1.1h1.4C87.1,37.4,87.2,37.6,87.3,37.7z M95.5,32.7l2.5,6.6h-1.5L96,37.8h-2.5L93,39.3h-1.5l2.5-6.6H95.5zM95.6,36.8l-0.8-2.4l0,0l-0.9,2.4H95.6z"
        />
        <circle fill="transparent" cx="92.3" cy="15.03" r="11.6" />
        <path
          fill="currentColor"
          d="M87.078,13.346c0.438-2.931,2.501-4.491,5.065-4.491c3.689,0,5.941,2.682,5.941,6.237c0,3.492-2.376,6.174-6.003,6.174c-2.501,0-4.69-1.497-5.128-4.552h2.939c0.063,1.559,1.126,2.121,2.564,2.121c1.626,0,2.751-1.497,2.751-3.867c0-2.432-0.938-3.742-2.689-3.742c-1.251,0-2.376,0.437-2.626,2.058h0.876l-2.314,2.307l-2.314-2.307L87.078,13.346z M92.269,3.43c-3.189,0-5.941,1.122-8.129,3.368C81.826,9.105,80.7,11.849,80.7,15.03s1.126,5.863,3.439,8.17c2.314,2.245,5.003,3.43,8.129,3.43c3.189,0,5.941-1.123,8.317-3.43c2.189-2.183,3.314-4.864,3.314-8.108s-1.126-5.987-3.377-8.232C98.272,4.491,95.521,3.43,92.269,3.43z M92.269,5.488c2.626,0,4.877,0.936,6.691,2.806c1.876,1.809,2.814,4.054,2.814,6.736c0,2.682-0.938,4.864-2.751,6.611c-1.939,1.871-4.19,2.806-6.754,2.806s-4.815-0.936-6.691-2.806c-1.876-1.871-2.814-4.116-2.814-6.673s0.938-4.802,2.877-6.736C87.391,6.424,89.642,5.488,92.269,5.488z"
        />
        <circle fill="transparent" cx="63.3" cy="15.03" r="11.6" />
        <path
          fill="currentColor"
          d="M66.5,12.13c0-0.4-0.3-0.7-0.7-0.7H61c-0.4,0-0.7,0.3-0.7,0.7v4.7h1.3v5.6h3.6v-5.6h1.3V12.13L66.5,12.13z M63.3,7.53c0.9,0,1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6S62.4,7.53,63.3,7.53z M63.3,3.43c-3.2,0-5.9,1.1-8.2,3.4s-3.4,5.1-3.4,8.2c0,3.2,1.1,5.9,3.4,8.2c2.3,2.3,5,3.4,8.2,3.4s6-1.1,8.3-3.4c2.2-2.2,3.3-4.9,3.3-8.1s-1.1-6-3.4-8.2C69.3,4.53,66.6,3.43,63.3,3.43z M63.4,5.53c2.6,0,4.9,0.9,6.7,2.8c1.9,1.8,2.8,4.1,2.8,6.7c0,2.7-0.9,4.9-2.7,6.6c-1.9,1.9-4.2,2.8-6.8,2.8c-2.6,0-4.8-0.9-6.7-2.8s-2.8-4.1-2.8-6.7s0.9-4.8,2.8-6.7C58.5,6.43,60.7,5.53,63.4,5.53z"
        />
        <circle fill="transparent" cx="21" cy="19" r="15.75" />
        <path
          fill="currentColor"
          d="M32.174,7.825c3.08,3.08,4.575,6.775,4.575,11.175s-1.496,8.095-4.487,11.087C29.094,33.254,25.311,34.75,21,34.75s-8.007-1.584-11.086-4.663S5.25,23.311,5.25,19c0-4.311,1.584-8.007,4.663-11.175C12.905,4.746,16.6,3.25,21,3.25S29.182,4.746,32.174,7.825z M11.937,9.849C9.385,12.489,8.066,15.48,8.066,19c0,3.424,1.166,6.349,3.579,8.855c2.237,2.323,5.288,3.778,8.508,3.967c3.874,0.227,7.244-1.092,9.998-3.846c2.464-2.376,3.695-5.367,3.695-9.063c0-3.608-1.232-6.687-3.783-9.151c-2.552-2.552-5.543-3.784-9.151-3.784C17.48,6.066,14.489,7.297,11.937,9.849z M18.8,17.504c-0.352-0.88-0.968-1.32-1.76-1.32c-1.408,0-2.112,0.968-2.112,2.816c0,1.848,0.704,2.816,2.112,2.816c0.88,0,1.584-0.44,1.936-1.408l1.936,1.056c-0.88,1.672-2.288,2.464-4.135,2.464c-1.408,0-2.552-0.44-3.431-1.32s-1.32-2.024-1.32-3.608c0-1.496,0.44-2.728,1.32-3.608s1.936-1.32,3.255-1.32c1.936,0,3.343,0.792,4.135,2.288L18.8,17.504zM27.775,17.504c-0.352-0.88-0.968-1.32-1.76-1.32c-1.408,0-2.112,0.968-2.112,2.816c0,1.848,0.704,2.816,2.112,2.816c0.88,0,1.584-0.44,1.936-1.408l1.936,1.056c-0.88,1.672-2.288,2.464-4.135,2.464c-1.408,0-2.552-0.44-3.431-1.32C21.439,21.728,21,20.584,21,19c0-1.496,0.44-2.728,1.32-3.608s1.936-1.32,3.343-1.32c1.936,0,3.343,0.792,4.135,2.288L27.775,17.504z"
        />
      </svg>
    </Link>
    <p sx={{ color: 'muted' }}>
      This work is licensed under a{' '}
      <Link
        to="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer">
        Creative Commons Attribution-ShareAlike 4.0 International License
      </Link>
    </p>
  </section>
)

const Footer = ({ post, meta, url }) => (
  <footer
    sx={{
      marginX: 'auto',
      paddingY: '3vw',
      maxWidth: 'inner'
    }}>
    <Meta title={post.fields.title} tags={post.fields.tags} url={url} />
    <Authors authors={post.fields.authors} />
    <License />
    {post.fields.comment && (
      <section
        sx={{
          marginBottom: 7
        }}>
        <ScreenReaderText as="h3">Comments</ScreenReaderText>
        <Comments url={url} slug={post.fields.slug} title={post.fields.title} />
      </section>
    )}
  </footer>
)

const RelatedPosts = ({ meta, post, related, prev, next }) => (
  <aside className="post-related">
    <Container>
      <h3 className="sr-only">Related posts</h3>
      <Row>
        <section className="category">
          <header className="category-header">
            <small>{meta.name}</small>
            <h3>
              <Link to={post.fields.categories[0].permalink}>
                {post.fields.categories[0].name}
              </Link>
            </h3>
          </header>
          <div className="category-divider">
            <Icon type="infinite" size={50} stroke={0.5} />
          </div>
          <ul className="category-posts">
            {related.nodes.map(post => (
              <li key={post.id}>
                <Link to={post.fields.permalink} title={post.fields.title}>
                  {post.fields.title}
                </Link>
              </li>
            ))}
          </ul>
          <footer className="category-footer">
            {related.totalCount > 1 ? (
              <Link to={post.fields.categories[0].permalink}>
                See all {related.totalCount} posts &rarr;
              </Link>
            ) : (
              <Link to={post.fields.categories[0].permalink}>
                See 1 post &rarr;
              </Link>
            )}
          </footer>
        </section>
        {prev && <Card post={prev} rel="prev" />}
        {next && <Card post={next} rel="next" />}
      </Row>
    </Container>
  </aside>
)

export default ({ data: { meta, post, prev, next, related }, location }) => (
  <Layout
    title={post.fields.title}
    subtitle={post.fields.description}
    description={post.fields.description || post.excerpt}
    cover={post.fields.cover}
    mask={3}
    hero={false}>
    <Container as="article" role="main" sx={{ marginBottom: 9 }}>
      <header
        sx={{
          paddingTop: '6vw',
          paddingBottom: '4vw',
          color: 'white',
          textAlign: 'center',
          textShadow: 'text',
          fontSize: 'lg'
        }}>
        <span
          sx={{
            textTransform: 'uppercase',
            a: {
              color: 'inherit'
            }
          }}>
          <time dateTime={post.fields.date} aria-label="Posted on">
            {moment.utc(post.fields.date).format('ll')}
          </time>
          <span
            role="separator"
            aria-hidden="true"
            sx={{
              ':before': {
                display: 'inline-block',
                marginX: 2,
                content: '"\\002f"',
                opacity: 0.6
              }
            }}
          />
          <Link to={post.fields.categories[0].permalink} aria-label="Posted in">
            {post.fields.categories[0].name}
          </Link>
        </span>
        <h1
          sx={{
            fontSize: 8,
            lineHeight: 'normal'
          }}>
          {post.fields.title}
        </h1>
      </header>
      <Image
        Tag="figure"
        file={post.fields.cover}
        alt={post.fields.title}
        title={post.fields.title}
        sx={{
          overflow: 'visible !important', // for box-shadow
          backgroundColor: 'dark',
          ':before,:after': {
            position: 'absolute',
            top: '10%',
            zIndex: 'low',
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
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        sx={{
          paddingX: ['3%', '5%', '10%'],
          paddingY: ['3%', '6%'],
          minHeight: '65vw',
          backgroundColor: 'background',
          fontSize: t => `calc(${t.fontSizes.md} + 0.33vw)`,
          fontFamily: 'serif',
          lineHeight: 'loose'
        }}
      />
      <Footer post={post} meta={meta} url={meta.url + location.pathname} />
    </Container>
    {/* <RelatedPosts
      meta={meta}
      post={post}
      related={related}
      prev={prev}
      next={next}
    /> */}
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
        updated
        cover {
          ...CoverImage
        }
        description
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
      excerpt(pruneLength: 160)
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
