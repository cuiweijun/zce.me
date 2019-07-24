import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

export default ({ title, menus, cover, children }) => {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="container">
          <Link className="nav-brand" to="/">
            <img alt={title} src="/logo.svg" width="25" height="25" />
            <span>{title}</span>
          </Link>
          <ul className="nav-menu">
            {menus.map(i => (
              <li key={i.link}>
                <Link to={i.link}>{i.text}</Link>
              </li>
            ))}
          </ul>
          <form className="nav-search" action="/search/">
            <input type="search" placeholder="Search" autoComplete="off" />
          </form>
        </div>
      </nav>
      {children && <div className="site-heading">{children}</div>}
      <Image className="site-cover" fluid={cover.childImageSharp.fluid} />
    </header>
  )
}
