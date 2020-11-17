/**
 * Site header
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Link from './link'
import Container from './container'
import ColorModeSwitcher from './color-mode-switcher'
import { usePinned } from '../utils'

const query = graphql`
  query NavigationComponent {
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
    aria-label="回到首页"
    css={t => ({
      display: 'flex',
      alignItems: 'center',
      paddingLeft: t.space[1],
      paddingRight: t.space[1],
      fontSize: t.fontSizes.xl,
      ':hover': { textDecoration: 'none' }
    })}
  >
    {/* prettier-ignore */}
    <svg viewBox="0 0 472 450" aria-hidden="true" css={t => ({ width: 25, height: 25, marginRight: t.space[2] })}>
      <defs>
        <filter id="shadow" x="-12.7%" y="-13.4%" width="125.4%" height="126.7%" filterUnits="objectBoundingBox">
          <feOffset in="SourceAlpha" result="offset-outer" />
          <feGaussianBlur stdDeviation="20" in="offset-outer" result="blue-outer" />
          <feComposite in="blue-outer" in2="SourceAlpha" operator="out" result="blue-outer" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="blue-outer" />
        </filter>
      </defs>
      <mask id="mask" fill="#fff">
        <path d="M472 114.26L203.029 335.74H407.1L472 449.48H64.9L0 335.74l268.971-221.48H64.9L0 .52h407.1z" />
      </mask>
      <g mask="url(#mask)" css={t => ({ fill: t.colors.primary })}>
        <path d="M0 0h472v449H0z" />
      </g>
      <g mask="url(#mask)">
        <path d="M0 335.74l64.9 113.74L472 114.26 407.1.52z" filter="url(#shadow)" />
      </g>
    </svg>
    <span>{name}</span>
  </Link>
)

const Menu = ({ items }) => (
  <ul
    css={t => ({
      display: 'flex',
      overflowX: 'auto',
      flex: 1,
      marginBottom: 0,
      marginLeft: t.space[1],
      marginRight: t.space[1],
      paddingLeft: t.space[1],
      paddingRight: t.space[1],
      listStyle: 'none',
      whiteSpace: 'nowrap',
      maskImage:
        'linear-gradient(to right, rgba(0, 0, 0, 0), #000 1em, #000 93%, rgba(0, 0, 0, 0))',
      WebkitOverflowScrolling: 'touch',
      MsOverflowScrolling: 'touch',
      MsOverflowStyle: 'none',
      '::-webkit-scrollbar': {
        display: 'none'
      },
      [t.screens.sm]: {
        marginLeft: t.space[3],
        marginRight: t.space[3],
        maskImage: 'none'
      }
    })}
  >
    {items.map(i => (
      <li key={i.link}>
        <Link
          to={i.link}
          children={i.text}
          css={t => ({
            display: 'block',
            opacity: 0.9,
            padding: t.space[2],
            ':hover': { textDecoration: 'none' }
          })}
        />
      </li>
    ))}
  </ul>
)

export default () => {
  const { meta } = useStaticQuery(query)
  return (
    <header
      css={t => ({
        ':before': { display: 'block', content: '""', height: t.sizes.nav }
      })}
    >
      <nav
        aria-label="主要导航"
        css={t => ({
          position: 'fixed',
          top: 0,
          zIndex: t.zIndices.sticky,
          width: '100%',
          borderBottom: `1px solid ${t.colors.border}`,
          background: t.colors.background,
          transform: `translateY(${usePinned() ? '0%' : '-100%'})`,
          transition: 'transform 0.3s linear',
          willChange: 'transform'
        })}
      >
        <Container
          css={t => ({
            display: 'flex',
            alignItems: 'center',
            height: t.sizes.nav
          })}
        >
          <Brand name={meta.name} />
          <Menu items={meta.navigation} />
          {/* <Search /> */}
          <ColorModeSwitcher />
        </Container>
      </nav>
    </header>
  )
}
