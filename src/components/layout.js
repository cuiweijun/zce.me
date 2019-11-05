/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Styled } from 'theme-ui'

const Header = props => (
  <Styled.header {...props} sx={{ variant: 'styles.header' }} />
)

// const Nav = props => (
//   <Styled.nav {...props} sx={{ variant: 'styles.nav' }}/>
// )

const Main = props => <Styled.main {...props} sx={{ variant: 'styles.main' }} />

const Footer = props => (
  <Styled.footer {...props} sx={{ variant: 'styles.footer' }} />
)

export default props => {
  return (
    <Fragment>
      <Header></Header>
      <Main>{props.children}</Main>
      <Footer></Footer>
    </Fragment>
  )
}
