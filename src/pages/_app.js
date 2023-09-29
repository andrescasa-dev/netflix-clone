import useLoadingRoute from '@/hooks/useLoadingRoute'
import magic from '@/lib/magicClient'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App ({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading] = useLoadingRoute(true)
  useEffect(() => {
    const showProperView = async () => {
      const isUserLogin = await magic.user.isLoggedIn()
      if (isUserLogin) {
        router.push('/')
      } else {
        router.push('/login')
      }
    }
    showProperView()
  }, [])

  return (
    isLoading
      ? <div>Loading...</div>
      : <Component {...pageProps} />
  )
}
