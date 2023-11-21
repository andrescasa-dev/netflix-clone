import { useGlobalStore } from '@/stores/GlobalStore'
import { useRouter } from 'next/router'

const useLogOut = () => {
  const { dispatchGlobalStore } = useGlobalStore()
  const router = useRouter()

  const logOut = async () => {
    const response = await fetch('/api/logout')
    if (!response.ok) console.err('could not log out')
    dispatchGlobalStore({ type: 'logout_user' })
    router.push('/login')
  }

  return logOut
}

export default useLogOut
