import React from 'react'

export default ({ title, excerpt, timeToRead, cover, permalink, authors, categories, defaultCover }) => (
  <article className="card">
    {node.fields.cover ? (
      <Image
        className="card-image"
        width="100%"
        height="225"
        fluid={node.fields.cover.childImageSharp.fluid}
      />
    ) : (
      <Image
        className="card-image"
        width="100%"
        height="225"
        fluid={data.file.childImageSharp.fluid}
      />
    )}
    <header className="card-header">
      <span>{node.fields.categories[0].id}</span>
      <h3>{node.fields.title}</h3>
    </header>
    <div className="card-body">
      <p>{node.excerpt}</p>
    </div>
    <footer className="card-meta">
      <ul>
        {node.fields.authors.map(author => (
          <li key={author.id}>
            <Link to={author.fields.permalink} title={author.id}>
              <Image
                fixed={author.avatar.childImageSharp.fixed}
                alt={author.id}
              />
            </Link>
          </li>
        ))}
      </ul>
      <small>{node.timeToRead} mins</small>
    </footer>
  </article>
)
