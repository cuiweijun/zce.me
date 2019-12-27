/** @jsx jsx */
import { jsx } from 'theme-ui'
import icons from '../assets/icons.json'

export default ({ name, size = 16, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    // sx={{ verticalAlign: 'text-bottom' }}
    dangerouslySetInnerHTML={{
      __html: icons[name] ? icons[name] : icons['alert-circle']
    }}
    {...props}
  />
)
