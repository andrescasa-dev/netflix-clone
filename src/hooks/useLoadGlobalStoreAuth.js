import { useGlobalStore } from '@/stores/GlobalStore'
import { useEffect } from 'react'

export default function useLoadGlobalStoreAuth (auth) {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()

  const loadLoggedUser = (auth) => {
    dispatchGlobalStore({ type: 'login_user', payload: { username: auth.userEmail } })
  }

  const browserValidation = async () => {
    const response = await fetch('/api/login')
    const { auth: localAuth } = await response.json()
    loadLoggedUser(localAuth)
  }

  useEffect(() => {
    if (auth.isBrowserValidation) {
      browserValidation()
    } else {
      if (globalStore.isLoadingAuth && auth.isLoggedIn) {
        loadLoggedUser(auth)
      }
    }
  }, [])

  return globalStore
}
