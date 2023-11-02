import { useGlobalStore } from '@/stores/GlobalStore'
import { useEffect } from 'react'
import getEmailFromMagic from '@/lib/getEmailFromMagic'

export default function useLoadMagicUserAuth () {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()
  console.log('useLoadMagicUserAuth hook, globalStore.isLoadingAuth: ', globalStore.isLoadingAuth)
  useEffect(() => {
    if (globalStore.isLoadingAuth) {
      console.log('petition to get email from magic')
      getEmailFromMagic().then(email => {
        dispatchGlobalStore({
          type: 'finish_loading_auth',
          payload: {
            username: email
          }
        })
      })
    }
  }, [])
}
