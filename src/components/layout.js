/** @jsx jsx */
import { jsx } from 'theme-ui'

import Meta from './meta'
import Header from './header'
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
  subtitle,
  description,
  keywords,
  cover,
  mask,
  hero,
  padding,
  align,
  background,
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
    <Header
      title={title}
      subtitle={subtitle}
      padding={padding}
      align={align}
      cover={cover}
      mask={mask}
      hero={hero}
    />
    <main
      id="content"
      children={children}
      sx={{
        position: 'relative',
        minHeight: '40vh',
        backgroundColor: background
      }}
    />
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
