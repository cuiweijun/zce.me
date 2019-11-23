/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, Children } from 'react'

export default ({ as: Tag = 'div', initial = 0, children, ...props }) => {
  const [current, setCurrent] = useState(initial)
  return (
    <Tag
      {...props}
      sx={{
        'ul[role=tablist]': {
          display: 'flex',
          margin: 0,
          padding: 0,
          borderBottom: 2,
          borderColor: 'border',
          listStyle: 'none',
          li: {
            marginBottom: t => `-${t.borderWidths[2]}`,
            paddingX: 3,
            paddingY: 2,
            borderBottom: 2,
            color: 'muted',
            transition: 'border 0.3s, color 0.3s',
            cursor: 'pointer',
            '&[aria-selected=true]': {
              borderColor: 'primary',
              color: 'primary'
            }
          }
        },
        '[role=tabpanel]': {
          display: 'none',
          '&.active': {
            display: 'block'
          }
        }
      }}>
      <ul role="tablist">
        {Children.map(children, (item, i) => (
          <li
            key={i}
            id={`${item.props.id || i}-tab`}
            role="tab"
            aria-controls={`${item.props.id || i}-tab-panel`}
            aria-selected={current === i}
            onClick={() => setCurrent(i)}
            children={item.props.name}
          />
        ))}
      </ul>
      {/* TODO: load panel on demand */}
      {Children.map(children, (item, i) => (
        <item.type
          key={i}
          id={`${item.props.id || i}-tab-panel`}
          className={current === i ? 'active' : ''}
          role="tabpanel"
          aria-labelledby={`${item.props.id || i}-tab`}
          children={item.props.children}
        />
      ))}
    </Tag>
  )
}
