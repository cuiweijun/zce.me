import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from 'gatsby-image'

const query = graphql`
  query CardComponent {
    file(relativePath: { eq: "images/unknown.jpg" }) {
      ...PostCardImage
    }
  }
`

export default ({ post }) => {
  if (!post.fields.cover) {
    post.fields.cover = useStaticQuery(query).file
  }

  return (
    <article className="card">
      <Link className="card-link" to={post.fields.permalink}></Link>
      <Image
        className="card-image"
        fluid={post.fields.cover.childImageSharp.fluid}
        alt={post.fields.title}
        title={post.fields.title}
      />
      <div className="card-content">
        <header>
          <span>{post.fields.categories[0].id}</span>
          <h3>{post.fields.title}</h3>
        </header>
        <main>
          <p>{post.excerpt}</p>
        </main>
        <footer>
          <ul>
            {post.fields.authors.map((author, i) => (
              <li
                key={author.id}
                style={{
                  zIndex: post.fields.authors.length - i
                }}>
                <Link to={author.fields.permalink} title={author.id}>
                  <Image
                    Tag="span"
                    fixed={author.avatar.childImageSharp.fixed}
                    alt={author.id}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <small>{`${post.timeToRead} min${post.timeToRead === 1 ? '' : 's'}`}</small>
        </footer>
      </div>
    </article>
  )
}
