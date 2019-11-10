/** @jsx jsx */
import { jsx } from 'theme-ui'

import Meta from './meta'
import Header from './header'
import Hero from './hero'
import Footer from './footer'

const Fragment = p => p.children

const SkipLink = props => (
  <a
    {...props}
    href="#content"
    children="Skip to content"
    sx={{
      position: 'absolute',
      overrflow: 'hidden',
      height: 1,
      width: 1,
      margin: -1,
      padding: 0,
      top: -999,
      clip: 'rect(0 0 0 0)',
      ':focus': {
        position: 'fixed',
        zIndex: '999',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        margin: 2,
        padding: 3,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white',
        clip: 'auto'
      }
    }}
  />
)

export default ({
  title,
  description,
  keywords,
  cover,
  coverMask,
  hero,
  heroPadding,
  type,
  children
}) => (
  <Fragment>
    <Meta
      title={title}
      description={description}
      keywords={keywords}
      image={cover}
      type={type}
    />
    <Header>
      {hero !== false && (
        <Hero
          title={title}
          subtitle={description}
          padding={heroPadding}
          children={hero}
          cover={cover}
          mask={coverMask}
        />
      )}
    </Header>
    <main id="content" children={children} sx={{ position: 'relative' }} />
  </Fragment>
)

// for wrapPageElement
// Prevent layout components from unmounting
// https://www.gatsbyjs.org/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Wrapper = ({ location, children }) => (
  <Fragment>
    <Meta pathname={location.pathname} />
    <SkipLink />
    {children}
    <Footer />
  </Fragment>
)
