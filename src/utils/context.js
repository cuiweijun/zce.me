/**
 * https://reactjs.org/docs/context.html
 */

import React from 'react'

export const Context = React.createContext()
export const useContext = () => React.useContext(Context)
export const RootProvider = Context.Provider
