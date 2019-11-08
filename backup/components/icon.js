import React from 'react'

import icons from '../assets/icons.svg'
import brands from '../assets/brands.svg'

const Icon = ({ type, size = 16, stroke = 2.5, ...rest }) => (
  <svg
    className="icon"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
    aria-hidden="true">
    <use xlinkHref={`${icons}#${type}`}></use>
  </svg>
)

const Brand = ({ type, size = 16, ...rest }) => (
  <svg
    className="icon"
    width={size}
    height={size}
    fill="currentColor"
    {...rest}
    aria-hidden="true">
    <use xlinkHref={`${brands}#${type}`}></use>
  </svg>
)

Icon.Brand = Brand

export default Icon
