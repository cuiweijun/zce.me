/**
 * Tabs
 */

import React from 'react'

export default ({ as: Tag = 'div', initial = 0, children, ...props }) => {
  const [current, setCurrent] = React.useState(initial)
  return (
    <Tag {...props}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        sx={{
          display: 'flex',
          borderBottom: 2,
          borderColor: 'border',
          transition: 'border 0.3s'
        }}>
        {React.Children.map(children, (item, i) => (
          <a
            key={i}
            id={`${item.props.id || i}-tab`}
            href={`#${item.props.id || i}`}
            role="tab"
            aria-controls={item.props.id || i}
            aria-selected={current === i}
            onClick={() => setCurrent(i)}
            children={item.props.name}
            sx={{
              mb: t => `-${t.borderWidths[2]}`,
              px: 3,
              py: 2,
              borderBottom: 2,
              color: 'muted',
              transition: 'border 0.3s, color 0.3s',
              ':hover': {
                textDecoration: 'none'
              },
              '&[aria-selected=true]': {
                borderColor: 'primary',
                color: 'primary'
              }
            }}
          />
        ))}
      </div>
      {/* TODO: load panel on demand */}
      {React.Children.map(children, (item, i) => (
        <item.type
          key={i}
          id={item.props.id || i}
          role="tabpanel"
          aria-labelledby={`${item.props.id || i}-tab`}
          children={item.props.children}
          sx={{ display: current === i || 'none' }}
        />
      ))}
    </Tag>
  )
}
