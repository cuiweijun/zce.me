import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import defaultCover from '../assets/content.svg'

// TODO: Post or Course
export default ({ post, rel }) => (
  <article className="card">
    <Link
      className="card-link"
      to={post.fields.permalink}
      title={post.fields.type.toUpperCase() + ' - ' + post.fields.title}
      rel={rel}
    />

    {post.fields.cover ? (
      <Image
        className="card-image"
        fluid={post.fields.cover.childImageSharp.fluid}
        alt={post.fields.title}
      />
    ) : (
      <img className="card-image" src={defaultCover} alt={post.fields.title} />
    )}

    <div className="card-main">
      <header className="card-header">
        <span>{post.fields.categories[0].name}</span>
        <h3>{post.fields.title}</h3>
      </header>

      <div className="card-content">
        <p>{post.excerpt}</p>
      </div>

      <footer className="card-footer">
        <ul>
          {post.fields.authors.map((author, i) => (
            <li
              key={author.name}
              style={{
                zIndex: post.fields.authors.length - i
              }}>
              <Link to={author.permalink} title={author.name}>
                <Image
                  Tag="span"
                  fixed={author.avatar.childImageSharp.fixed}
                  alt={author.name}
                />
              </Link>
            </li>
          ))}
        </ul>

        {post.fields.type === 'course' ? (
          <small>
            {post.fields.sections.length} video
            {post.fields.sections.length === 1 ? '' : 's'}
          </small>
        ) : (
          <small>
            {post.timeToRead} min{post.timeToRead === 1 ? '' : 's'}
          </small>
        )}
      </footer>
    </div>
  </article>
)

export const GraphQLFragment = graphql`
  # Load post card image required data.
  fragment CardImage on File {
    childImageSharp {
      fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }

  # Load post card avatar image required data.
  fragment CardAvatarImage on File {
    childImageSharp {
      fixed(width: 30, height: 30) {
        ...GatsbyImageSharpFixed
      }
    }
  }

  # Load card component required data.
  fragment Card on MarkdownRemark {
    id
    excerpt(pruneLength: 60, truncate: true)
    timeToRead
    fields {
      title
      cover {
        ...CardImage
      }
      type
      permalink
      authors {
        name
        avatar {
          ...CardAvatarImage
        }
        permalink
      }
      categories {
        name
        permalink
      }
      sections {
        name
      }
    }
  }
`
