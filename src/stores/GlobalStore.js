import globalStoreReducer from './globalStoreReducer'

const { createContext, useReducer, useContext } = require('react')

const GlobalContext = createContext(null)

export default function GlobalStore ({ children, initialStore }) {
  const [globalStore, dispatchGlobalStore] = useReducer(globalStoreReducer, initialStore)
  return (
    <GlobalContext.Provider value={{ globalStore, dispatchGlobalStore }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalStore = () => useContext(GlobalContext)
