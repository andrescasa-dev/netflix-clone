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
  const handleMagicLogOut = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/logout')
      const res = await response.json()
      console.log('res: ', res)
      dispatchGlobalStore({
        type: 'update_username',
        payload: { username: '' }
      })
    } catch (error) {
      console.error('Error logging out', error)
      router.push('/login')
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
             : !globalStore.username
                 ? <Link href={'/login'}>Login</Link>
                 : <Dropdown text={globalStore.username } handleClick={handleMagicLogOut} />
           }
        </div>
      </div>
    </header>
  )
}
