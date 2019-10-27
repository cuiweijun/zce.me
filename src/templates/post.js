import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import moment from 'moment'

import { Layout, Icon, Card, Comments } from '../components'

export default ({ data, location }) => {
  const { siteMetadata, post, prev, next, relatedPosts } = data
  const { fields } = post
  const url = siteMetadata.url + location.pathname

  return (
    <Layout
      className="post"
      title={fields.title}
      description={fields.description || post.excerpt}
      cover={fields.cover}
      header={false}
      location={location}>
      <article className="container" role="main">
        <header className="post-header">
          <span className="post-meta">
            <time dateTime={fields.date} aria-label="Posted on">
              {moment.utc(fields.date).format('ll')}
            </time>
            <span role="separator" aria-hidden="true" />
            <Link to={fields.categories[0].permalink} aria-label="Posted in">
              {fields.categories[0].name}
            </Link>
          </span>
          <h1 className="post-title">{fields.title}</h1>
        </header>

        {fields.cover && (
          <Image
            Tag="figure"
            className="post-cover"
            alt={fields.title}
            title={fields.title}
            fluid={fields.cover.childImageSharp.fluid}
          />
        )}

        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="post-footer">
          <section className="post-more">
            {fields.tags && (
              <div className="post-tags">
                <Icon type="tag" />
                <ul className="tags">
                  {fields.tags.map(i => (
                    <li key={i.name}>
                      <Link to={i.permalink}>{i.n}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="post-share">
              <span>Share this:</span>
              <a
                href={`https://twitter.com/share?text=${fields.title}&url=${url}`}
                title="Twitter">
                <Icon.Brand type="twitter" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                title="Facebook">
                <Icon.Brand type="facebook" />
              </a>
              <a
                href={`http://qr.topscan.com/api.php?text=${url}`}
                title="Moment">
                <Icon type="aperture" />
              </a>
            </div>
          </section>

          <section className="post-authors">
            <h3 className="sr-only">Author</h3>
            <div className="author">
              <Image
                className="avatar"
                fixed={fields.authors[0].avatar.childImageSharp.fixed}
              />
              <div className="content">
                <h4>{fields.authors[0].name}</h4>
                <p>{fields.authors[0].bio}</p>
              </div>
              <Link className="btn btn-pill" to={fields.authors[0].permalink}>
                Read More
              </Link>
            </div>
            {fields.authors.length > 1 && (
              <p className="contributors">
                <span>Contributors: </span>
                {fields.authors.slice(1).map(i => (
                  <Link to={i.permalink} key={i.name}>
                    {i.name}
                  </Link>
                ))}
              </p>
            )}
          </section>

          <section className="post-license">
            <h3 className="sr-only">License</h3>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer">
              <Icon.Brand type="license" width={160} height={70} />
            </a>
            <p>
              This work is licensed under a{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer">
                Creative Commons Attribution-ShareAlike 4.0 International
                License
              </a>
            </p>
          </section>

          {fields.comment && (
            <section className="post-comments">
              <Comments url={url} slug={fields.slug} title={fields.title} />
            </section>
          )}
        </footer>
      </article>

      <aside className="post-related">
        <div className="container">
          <h3 className="sr-only">Related posts</h3>
          <div className="row">
            <section className="category">
              <header className="category-header">
                <small>{siteMetadata.name}</small>
                <h3>
                  <Link to={fields.categories[0].permalink}>
                    {fields.categories[0].name}
                  </Link>
                </h3>
              </header>
              <div className="category-divider">
                <Icon type="infinite" size={50} stroke={0.5} />
              </div>
              <ul className="category-posts">
                {relatedPosts.nodes.map(post => (
                  <li key={post.id}>
                    <Link to={post.fields.permalink} title={post.fields.title}>
                      {post.fields.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <footer className="category-footer">
                {relatedPosts.totalCount > 1 ? (
                  <Link to={fields.categories[0].permalink}>
                    See all {relatedPosts.totalCount} posts &rarr;
                  </Link>
                ) : (
                  <Link to={fields.categories[0].permalink}>
                    See 1 post &rarr;
                  </Link>
                )}
              </footer>
            </section>

            {prev && <Card post={prev} rel="prev" />}
            {next && <Card post={next} rel="next" />}
          </div>
        </div>
      </aside>
    </Layout>
  )
}

export const query = graphql`
  query PostTemplate($id: String!, $cat: String, $prev: String, $next: String) {
    siteMetadata: config {
      url
      name
    }

    post: markdownRemark(id: { eq: $id }) {
      fields {
        comment
        title
        slug
        date
        updated
        cover {
          ...SiteCoverImage
        }
        description
        permalink
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
      ...PostCard
    }

    next: markdownRemark(id: { eq: $next }) {
      ...PostCard
    }

    relatedPosts: allMarkdownRemark(
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
