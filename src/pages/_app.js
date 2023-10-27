import useLoadingRoute from '@/hooks/useLoadingRoute'
import GlobalStore from '@/stores/GlobalStore'
import getEmailFromMagic from '@/lib/getEmailFromMagic'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useLoadingRoute(false)
  const [email, setEmail] = useState('')
  // useEffect(() => {
  //   getEmailFromMagic().then(email => {
  //     setEmail(email)
  //     setIsLoading(false)
  //   })
  // }, [])

  return (
    isLoading
      ? <div>Loading...</div>
      : (
        <GlobalStore initialStore={{
          username: email
        }}>
          <Component {...pageProps} />
        </GlobalStore>
        )
  )
}
