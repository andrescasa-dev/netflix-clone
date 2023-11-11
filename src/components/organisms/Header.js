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
      await fetch('/api/logout')
      dispatchGlobalStore({ type: 'logout_user' })
      router.push('/login')
    } catch (error) {
      console.error('Error logging out', error)
    }
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
             : globalStore.isLoggedIn
               ? <Dropdown text={globalStore.username } handleClick={handleLogOutClick} />
               : <Link href={'/login'}>Login</Link>
           }
        </div>
      </div>
    </header>
  )
}
