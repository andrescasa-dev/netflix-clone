import { useGlobalStore } from '@/stores/GlobalStore'
import { useEffect } from 'react'

export default function useLoadGlobalStoreAuth (clientAuth) {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()

  const getAuthFromApi = async () => {
    const response = await fetch('/api/login')
    const { auth } = await response.json()
    return auth
  }

  const loadAuth = (auth) => {
    dispatchGlobalStore({ type: 'load_user', payload: auth })
  }

  useEffect(() => {
    if (globalStore.isLoadingAuth) {
      if (clientAuth.willGetAuthFromApi) {
        getAuthFromApi().then((apiAuth) => {
          loadAuth(apiAuth)
        })
      } else {
        loadAuth(clientAuth)
      }
    }
  }, [])

  return globalStore
}
