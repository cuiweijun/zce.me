import theme from './theme'

declare module '@emotion/react' {
  type Custom = typeof theme
  interface Theme extends Custom {}
}
