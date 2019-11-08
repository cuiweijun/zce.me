/** @jsx jsx */
import { jsx } from 'theme-ui'
import { icons } from 'feather-icons'

export default ({ name, size = '16', ...props }) => {
  if (!icons[name]) {
    name = 'alert-circle'
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      sx={{ verticalAlign: 'text-bottom' }}
      dangerouslySetInnerHTML={{ __html: icons[name].contents }}
      {...props}
    />
  )
}
