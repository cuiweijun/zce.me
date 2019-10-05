import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from 'gatsby-image'

const query = graphql`
  query CardComponent {
    siteMetadata: config {
      card {
        image {
          ...PostCardImage
        }
      }
    }
  }
`

export default ({ post, rel }) => {
  const { siteMetadata } = useStaticQuery(query)
  post.fields.cover = post.fields.cover || siteMetadata.card.image

  return (
    <article className="card">
      <Link
        className="card-link"
        to={post.fields.permalink}
        title={post.fields.title}
        rel={rel}
      />

      <Image
        className="card-image"
        fluid={post.fields.cover.childImageSharp.fluid}
        alt={post.fields.title}
      />

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
          <small>
            {post.timeToRead} min{post.timeToRead === 1 ? '' : 's'}
          </small>
        </footer>
      </div>
    </article>
  )
}

export const GraphQLFragment = graphql`
  # Load post card image required data.
  fragment PostCardImage on File {
    childImageSharp {
      fluid(maxWidth: 540, maxHeight: 360, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }

  # Load post card component required data.
  fragment PostCard on MarkdownRemark {
    id
    excerpt
    timeToRead
    fields {
      title
      cover {
        ...PostCardImage
      }
      permalink
      authors {
        name
        avatar {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        permalink
      }
      categories {
        name
        permalink
      }
    }
  }
`
