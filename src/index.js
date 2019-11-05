import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
