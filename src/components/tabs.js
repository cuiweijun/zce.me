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
        css={t => ({
          display: 'flex',
          borderBottom: `2px solid ${t.colors.border}`
        })}
      >
        {React.Children.map(children, (item, i) => (
          <a
            key={i}
            id={`${item.props.id || i}-tab`}
            href={`#${item.props.id || i}`}
            role="tab"
            aria-controls={item.props.id || i}
            aria-label={item.props.name}
            aria-selected={current === i}
            onClick={() => setCurrent(i)}
            children={item.props.name}
            css={t => ({
              marginBottom: '-2px',
              padding: `${t.space[2]} ${t.space[3]}`,
              borderBottom: `2px solid ${t.colors.border}`,
              color: t.colors.muted,
              transition: 'border 0.3s, color 0.3s',
              ':hover': {
                textDecoration: 'none'
              },
              '&[aria-selected=true]': {
                borderColor: t.colors.primary,
                color: t.colors.primary
              }
            })}
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
          css={{ display: current === i || 'none' }}
        />
      ))}
    </Tag>
  )
}
