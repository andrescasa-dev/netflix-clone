import { useGlobalStore } from '@/stores/GlobalStore'
import { useEffect } from 'react'

export default function useLoadGlobalStoreAuth (auth) {
  if (!auth || !auth.isLoggedIn) console.error(' should provide a valid auth')
  const { globalStore, dispatchGlobalStore } = useGlobalStore()
  useEffect(() => {
    if (!globalStore.isLoggedIn && auth.isLoggedIn) {
      dispatchGlobalStore({ type: 'login_user', payload: { username: auth.userEmail } })
    }
  }, [])

  return globalStore
}
