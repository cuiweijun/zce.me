import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Container from './container'
import Link from './link'
import Hero from './hero'
import Cover from './cover'
import ColorModeSwitcher from './color-mode-switcher'
import { usePinned } from '../utils/hooks'

const query = graphql`
  query HeaderComponent {
    meta: config {
      name
      navigation {
        text
        link
      }
    }
  }
`

const Brand = ({ name }) => (
  <Link
    to="/"
    sx={{
      display: 'flex',
      alignItems: 'center',
      px: 1,
      fontSize: 'xl',
      ':hover': {
        textDecoration: 'none'
      }
    }}>
    <svg viewBox="0 0 472 450" aria-hidden="true" sx={{ size: '25px', mr: 2 }}>
      <defs>
        <filter
          id="shadow"
          x="-12.7%"
          y="-13.4%"
          width="125.4%"
          height="126.7%"
          filterUnits="objectBoundingBox">
          <feOffset in="SourceAlpha" result="offset-outer" />
          <feGaussianBlur
            stdDeviation="20"
            in="offset-outer"
            result="blue-outer"
          />
          <feComposite
            in="blue-outer"
            in2="SourceAlpha"
            operator="out"
            result="blue-outer"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            in="blue-outer"
          />
        </filter>
      </defs>
      <mask id="mask" fill="#fff">
        <path d="M472 114.26L203.029 335.74H407.1L472 449.48H64.9L0 335.74l268.971-221.48H64.9L0 .52h407.1z" />
      </mask>
      <g mask="url(#mask)" sx={{ fill: 'primary', transition: 'fill 0.3s' }}>
        <path d="M0 0h472v449H0z" />
      </g>
      <g mask="url(#mask)">
        <path
          d="M0 335.74l64.9 113.74L472 114.26 407.1.52z"
          filter="url(#shadow)"
        />
      </g>
    </svg>
    <span>{name}</span>
  </Link>
)

const Menu = ({ items }) => (
  <ul
    sx={{
      display: 'flex',
      overflowX: 'auto',
      flex: 1,
      m: 0,
      mx: [1, 3],
      px: 1,
      listStyle: 'none',
      whiteSpace: 'nowrap',
      maskImage: [
        'linear-gradient(to right, rgba(0, 0, 0, 0), #000 1em, #000 93%, rgba(0, 0, 0, 0))',
        'none'
      ],
      WebkitOverflowScrolling: 'touch',
      MsOverflowScrolling: 'touch',
      MsOverflowStyle: 'none',
      '::-webkit-scrollbar': {
        display: 'none'
      }
    }}>
    {items.map(i => (
      <li key={i.link}>
        <Link
          to={i.link}
          children={i.text}
          sx={{
            display: 'block',
            opacity: 0.9,
            p: 2,
            ':hover': {
              textDecoration: 'none'
            }
          }}
        />
      </li>
    ))}
  </ul>
)

export default ({ title, subtitle, hero, padding, align, cover, mask }) => {
  const { meta } = useStaticQuery(query)
  return (
    <header
      sx={{ ':before': { display: 'block', content: '""', height: 'nav' } }}>
      <nav
        aria-label="主要导航"
        sx={{
          position: 'fixed',
          top: 0,
          zIndex: 'fixed',
          width: '100%',
          borderBottom: 1,
          borderColor: 'border',
          bg: 'background',
          transform: `translateY(${usePinned() ? '0%' : '-100%'})`,
          transition: 'background 0.3s, border 0.3s, transform 0.3s linear',
          willChange: 'transform'
        }}>
        <Container
          sx={{ display: 'flex', alignItems: 'center', height: 'nav' }}>
          <Brand name={meta.name} />
          <Menu items={meta.navigation} />
          {/* <Search /> */}
          <ColorModeSwitcher />
        </Container>
      </nav>
      {hero !== false && (
        <Hero
          title={title}
          subtitle={subtitle}
          children={hero}
          sx={{
            py: padding || '10vw',
            textAlign: align || 'center',
            color: cover === false ? 'text' : 'white',
            textShadow: cover === false ? null : 'text'
            // TODO: transition
            // transition: 'padding 0.3s, color 0.3s'
          }}
        />
      )}
      {cover !== false && <Cover image={cover} mask={mask} />}
    </header>
  )
}
