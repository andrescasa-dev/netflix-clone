import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useLoadingRoute () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const stopLoading = () => {
      console.log('end loading')
      setIsLoading(false)
    }
    const startLoading = () => {
      console.log('start loading')
      setIsLoading(true)
    }

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', stopLoading)
    router.events.on('routeChangeError', stopLoading)
    return () => {
      router.events.off('routeChangeComplete', stopLoading)
      router.events.off('routeChangeError', stopLoading)
      router.events.off('routeChangeStart', startLoading)
    }
  }, [router])

  return [isLoading, setIsLoading]
}
