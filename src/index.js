import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import theme from './theme'

export const wrapRootElement = ({ element }) => (
  <>
    <Global styles={{ body: { margin: 0 } }} />
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </>
)
