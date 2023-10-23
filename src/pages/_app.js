import useLoadingRoute from '@/hooks/useLoadingRoute'
import getEmailFromMagic from '@/lib/getEmailFromMagic'
import GlobalStore from '@/stores/GlobalStore'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useLoadingRoute(true)
  const [email, setEmail] = useState('')
  useEffect(() => {
    getEmailFromMagic().then(email => {
      setEmail(email)
      setIsLoading(false)
    })
  }, [])

  return (
    isLoading
      ? <div>Loading...</div>
      : (
        // how should i handle the creating of a global Store, i need a store with a email.
        /* if the user is already logged and never come from the login page, in the first render
        of app i should load the magicEmailTo the global store.
        */

      // if there is already a email from magic dispatch update username in globalStore
      // i want to update a store using this: dispatch({type:'update_username', payload:{username}})
      <GlobalStore initialStore={{
        username: email
      }}>
        <Component {...pageProps} />
      </GlobalStore>
        )
  )
}
