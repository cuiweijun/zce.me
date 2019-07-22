import React from 'react'

export default ({ author }) => (
  <footer className="site-footer">
    <p className="container mb-0 py-4 text-center text-muted">
      &copy; {new Date().getFullYear()} by {author}, Built with{' '}
      <a href="https://gatsbyjs.org" target="_blank" rel="noopener noreferrer">
        Gatsby
      </a>
      . Visit the{' '}
      <a
        href="https://github.com/zce/zce.me"
        target="_blank"
        rel="noopener noreferrer">
        Source
      </a>
      .
    </p>
  </footer>
)
