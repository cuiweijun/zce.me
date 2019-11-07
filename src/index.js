/** @jsx jsx */
import { jsx, ThemeProvider, ColorMode } from 'theme-ui'
import { Global } from '@emotion/core'
import theme from './theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <Global styles={theme.globalStyles} />
    {element}
  </ThemeProvider>
)
