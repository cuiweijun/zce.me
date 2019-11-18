/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ id = 'content', ...props }) => (
  <a
    {...props}
    href={`#${id}`}
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
        backgroundColor: 'background',
        clip: 'auto'
      }
    }}
  />
)
