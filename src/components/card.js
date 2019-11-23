/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Link from './link'
import Image from './image'

// TODO: UI, Post or Course
export default ({ as: Tag = 'article', post, rel }) => (
  <Tag
    sx={{
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      flex: '1 1 18rem',
      flexDirection: 'column',
      marginX: 3,
      marginBottom: 6,
      borderRadius: 'medium',
      backgroundColor: 'background',
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
        zIndex: 1
      }}
    />

    {post.fields.cover ? (
      <Image
        file={post.fields.cover}
        alt={post.fields.title}
        sx={{
          maxHeight: '25rem',
          backgroundColor: 'dark',
          objectFit: 'cover'
        }}
      />
    ) : (
      <svg
        viewBox="0 0 540 360"
        aria-hidden="true"
        sx={{ maxHeight: '25rem', backgroundColor: '#66d9e8' }}>
        <path
          d="M280.7,142.5v14.7H210.6V142.5h1.8l9.2,4.1,4.1-4.1Z"
          fill="#339af0"
        />
        <path
          d="M195.5,151.3l-7-17.8L171,141.2l-1.4-1.4,7.6-17.5-17.8-7v-.5l17.8-7-7.6-17.6.3-.4,17.5,7.6,7-17.8h.5l7,17.8,17.6-7.7,1.4,1.4-7.7,17.5,17.8,7v.5l-17.8,7,7.7,17.6-.4.3-17.6-7.7-7,17.7-.4.3ZM195.2,98a17.67,17.67,0,0,0-17.7,17.7,17,17,0,0,0,2.5,8.9,17.7,17.7,0,1,0,23.9-24.4A19,19,0,0,0,195.2,98Z"
          fill="#38d9a9"
        />
        <path
          d="M352.2,123.8l-.1-.6L319.5,91.3h-95l-6.8,15.5,16.8,6.6v3.9h0v1.1l-16.8,6.5,7.2,16.5-3.5,3.5-16.5-7.2-6.5,16.8h-4.9l-6.8-17.4V297h143V276.9h22.6ZM326.8,294.2H189.3V151.8l2.2,5.6h8.7l6.2-15.8,15.6,6.8,4.7-4.7,1.5-1.4-6.8-15.6,15.9-6.2v-3h58.6l29,28.3,1.9,1.8V276.9h0Zm22.6-20H329.6V146.5l-.5-.4L306,123.5l-9-8.8H237.2v-3l-15.8-6.2,4.8-11.3h92.2l23.5,22.9,5.5,5.4,2,2Z"
          fill="#4a555f"
        />
        <path
          d="M352.1,123.2,319.5,91.3h-1.9v33.8h34.6v-1.9Zm-31.8-.8V96l21.5,20.9,5.5,5.5Zm8.3,23.3-22.8-22.2-8.9-8.9H295v33.8h34.6v-1.9Zm-30.9,0V119.3l27.1,26.4Zm-87.2,27.6h97V176H210.6Zm0,22.5h97v2.8H210.6Zm0,22.5h40.2v2.8H210.5Zm0,22.3h40.2v2.8H210.5Zm0,22.1h40.2v2.8H210.5Z"
          fill="#4a555f"
        />
        <path
          d="M200.2,157.3h-8.7l-6.3-15.9-15.7,6.8-.8-1-6.3-6.3,6.8-15.6-15.8-6.2v-8.7l15.9-6.2-6.8-15.5,1-1.1,5.1-5.1,15.6,6.8,6.3-15.7h8.7l6.3,15.8,15.6-6.8,7.1,7.1-6.8,15.6,15.9,6.3v8.7l-15.9,6.2,6.8,15.6-1.1,1-5.1,5.1-15.6-6.8Zm-6.8-2.7h4.9l6.5-16.8,16.6,7.2,3.5-3.5L217.8,125l16.8-6.5v-5l-16.8-6.6,7.1-16.4L220.4,86l-16.6,7.2-6.6-16.8h-5l-6.5,16.8L169.2,86l-3.5,3.5,7.2,16.4-16.8,6.5v5l16.8,6.5-7.2,16.5,4.5,4.5,16.5-7.2Zm1.8-24.4a14.56,14.56,0,0,1-12.5-7.1,14.3,14.3,0,0,1-2-7.3,14.5,14.5,0,0,1,29,0,14.36,14.36,0,0,1-14.5,14.4Zm0-26.2a11.65,11.65,0,0,0-11.7,11.7v.1a10.18,10.18,0,0,0,1.7,5.9,11.7,11.7,0,0,0,20.2-11.8,12.45,12.45,0,0,0-10.2-5.9Z"
          fill="#4a555f"
        />
        <path
          d="M260.2,218.4v47.1h48.7V218.4Zm22.3,23.5L263,260.8V223ZM265,221.1h39.1L284.5,240Zm19.5,22.8L304,262.7H265.1Zm2-2,19.7-19v38Z"
          fill="#4a555f"
        />
      </svg>
    )}

    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 3
      }}>
      <span sx={{ color: 'muted', textTransform: 'uppercase' }}>
        {post.fields.categories[0].name}
      </span>
      <h3
        sx={{
          overflow: 'hidden',
          fontSize: 5,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
        {post.fields.title}
      </h3>

      <div sx={{ flexGrow: 1, marginBottom: 3 }}>
        <p sx={{ margin: 0 }}>{post.excerpt}</p>
      </div>

      <footer
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <ul
          sx={{
            zIndex: 2,
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            ':hover': {
              li: {
                marginLeft: 0
              }
            }
          }}>
          {post.fields.authors.map((author, i) => (
            <li
              key={author.name}
              sx={{
                zIndex: post.fields.authors.length - i,
                marginLeft: i > 0 ? -3 : 0,
                transition: 'margin 0.2s'
              }}>
              <Link to={author.permalink} title={author.name}>
                <img
                  alt={author.name}
                  src={author.avatar.childImageSharp.fixed.src}
                  srcSet={author.avatar.childImageSharp.fixed.srcSet}
                  sx={{
                    border: 2,
                    borderColor: 'border',
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
  </Tag>
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
        title
      }
    }
  }
`
