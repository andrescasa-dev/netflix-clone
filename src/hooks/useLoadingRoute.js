import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useLoadingRoute (initialValue = false) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(initialValue)

  useEffect(() => {
    const stopLoading = (url) => {
      console.log('end loading ' + url)
      setIsLoading(false)
    }

    const handleError = (err, url) => {
      console.log('error loading route ' + err + ' url: ' + url)
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', stopLoading)
    router.events.on('routeChangeError', handleError)
    return () => {
      router.events.off('routeChangeComplete', stopLoading)
      router.events.off('routeChangeError', handleError)
    }
  }, [])

  return [isLoading, setIsLoading]
}
