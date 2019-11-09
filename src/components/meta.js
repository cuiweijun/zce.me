/** @jsx jsx */
import { jsx } from 'theme-ui'
import Helmet from 'react-helmet'

export default ({ title, description, keywords, image, ...props }) => (
  <Helmet
    {...props}
    title={title}
    meta={[
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'og:image', content: image }
    ]}
  />
)
