import React from 'react'
import { Link } from 'gatsby'

export default ({ title, logo, menus }) => {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="site-brand" to="/">
          <img alt={title} src={logo} width="25" height="25" />
          <span>{title}</span>
        </Link>
        <nav className="site-nav">
          {menus.map(i => (
            <Link to={i.link} key={i.link}>
              {i.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
