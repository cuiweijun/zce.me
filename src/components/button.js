/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ variant = 'primary', ...props }) => (
  <button
    {...props}
    sx={{
      display: 'inline-block',
      m: 0,
      px: 3,
      py: 2,
      border: 0,
      borderRadius: 'medium',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      fontWeight: 'bold',
      transition: 'color 0.2s, background 0.2s, border 0.2s, box-shadow 0.2s',
      appearance: 'none',
      // pass variant prop to sx
      variant: `variants.buttons.${variant}`
    }}
  />
)
