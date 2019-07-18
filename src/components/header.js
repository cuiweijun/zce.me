import React, { useState }  from 'react'
import { Link } from 'gatsby'

export default ({ title, logo, menus }) => {
  const [ collapse, toggleCollapse ] = useState(false)
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {/* <img className="d-inline-block align-top" alt={title} src={logo} width="30" height="30" /> */}
            {title}
          </Link>
          <button
            className={`navbar-toggler ${collapse ? '' : 'collapsed'}`}
            type="button"
            aria-controls="site_menus"
            aria-expanded={collapse}
            aria-label="Toggle navigation"
            onClick={() => toggleCollapse(!collapse)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`navbar-collapse collapse ${collapse ? 'show' : ''}`} id="site_menus">
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
        </div>
      </nav>
    </header>
  )
}
