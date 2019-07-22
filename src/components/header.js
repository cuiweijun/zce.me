import React from 'react'
import { Link } from 'gatsby'

export default ({ title, logo, menus }) => {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              className="align-top mr-2"
              alt={title}
              src={logo}
              width="30"
              height="30"
            />
            <span>{title}</span>
          </Link>
          <ul className="navbar-nav">
            {menus.map(i => (
              <li className="nav-item" key={i.link}>
                <Link className="nav-link" activeClassName="active" to={i.link}>
                  {i.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
