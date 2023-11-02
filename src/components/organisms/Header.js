import Logo from '@/components/atoms/Logo'
import NavLink from '@/components/atoms/NavLink'
import Dropdown from '@/components/molecules/Dropdown'
import styles from '@/styles/Header.module.css'
import { useRouter } from 'next/router'
import { useGlobalStore } from '@/stores/GlobalStore'
import Link from 'next/link'

export default function Header () {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()
  const router = useRouter()

  const handleLogOutClick = async (e) => {
    e.preventDefault()
    try {
      await serverLogOut()
      dispatchGlobalStore({ type: 'logout_user' })
      router.push('/login')
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  const serverLogOut = async () => {
    const response = await fetch('/api/logout')
    const res = await response.json()
    console.log('res: ', res)
  }

  return (
    <header className={`${styles.header} mainLayout`}>
      <div className={styles.header__content}>
        <Logo />
        <NavLink text='Home' href='/'/>
        <NavLink text='My List' href='/browse/my-list'/>
        <div className={styles.header__dropdown}>
           {globalStore.isLoadingAuth
             ? 'loading...'
             : !globalStore.isLoggedIn
                 ? <Link href={'/login'}>Login</Link>
                 : <Dropdown text={globalStore.username } handleClick={handleLogOutClick} />
           }
        </div>
      </div>
    </header>
  )
}
