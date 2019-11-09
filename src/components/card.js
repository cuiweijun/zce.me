/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Link from './link'
import defaultCover from '../assets/content.svg'

// TODO: UI, Post or Course
export default ({ post, rel }) => (
  <article
    sx={{
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      flex: t => `1 1 ${t.sizes.card}`,
      flexDirection: 'column',
      marginX: 3,
      marginBottom: 6,
      borderRadius: 'medium',
      backgroundColor: 'light',
      boxShadow: 'light',
      transition: 'box-shadow 0.3s, transform 0.3s, flex 0.3s',
      willChange: 'transform',
      ':hover': {
        boxShadow: 'medium',
        transform: 'translate(0, -2px)'
      }
    }}>
    <Link
      to={post.fields.permalink}
      title={post.fields.type.toUpperCase() + ' - ' + post.fields.title}
      rel={rel}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 'high'
      }}
    />

    {post.fields.cover ? (
      <Image
        fluid={post.fields.cover.childImageSharp.fluid}
        alt={post.fields.title}
        sx={{
          maxHeight: '25rem',
          backgroundColor: 'dark',
          objectFit: 'cover'
        }}
      />
    ) : (
      <img
        src={defaultCover}
        alt={post.fields.title}
        sx={{
          maxHeight: '25rem',
          backgroundColor: 'light',
          objectFit: 'cover'
        }}
      />
    )}

    <div sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <header sx={{ padding: 3 }}>
        <span sx={{ color: 'muted', textTransform: 'uppercase' }}>
          {post.fields.categories[0].name}
        </span>
        <h3
          sx={{
            overflow: 'hidden',
            margin: 0,
            fontSize: 'xl',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
          {post.fields.title}
        </h3>
      </header>

      <div sx={{ flexGrow: 1, paddingX: 3 }}>
        <p sx={{ margin: 0 }}>{post.excerpt}</p>
      </div>

      <footer
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 3
        }}>
        <ul
          sx={{
            zIndex: 'high',
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none'
          }}>
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
                  sx={{
                    border: 'double',
                    borderColor: 'light',
                    borderRadius: 'circle',
                    verticalAlign: 'middle'
                  }}
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
