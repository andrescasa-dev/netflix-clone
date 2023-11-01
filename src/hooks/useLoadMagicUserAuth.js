import { useGlobalStore } from '@/stores/GlobalStore'
import { useEffect } from 'react'
import getEmailFromMagic from '@/lib/getEmailFromMagic'

export default function useLoadMagicUserAuth () {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()
  useEffect(() => {
    if (globalStore.isLoading) {
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
