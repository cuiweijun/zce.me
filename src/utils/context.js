/**
 * Global Context
 * https://reactjs.org/docs/context.html
 * TODO: global context
 */

import React from 'react'

export const Context = React.createContext()
export const useContext = () => React.useContext(Context)
export const Provider = Context.Provider
