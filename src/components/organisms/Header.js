import Logo from '@/components/atoms/Logo'
import NavLink from '@/components/atoms/NavLink'
import Dropdown from '@/components/molecules/Dropdown'
import styles from '@/styles/Header.module.css'
import { useGlobalStore } from '@/stores/GlobalStore'
import Link from 'next/link'

export default function Header () {
  const { globalStore, dispatchGlobalStore } = useGlobalStore()

  const handleLogOutClick = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/logout')
      dispatchGlobalStore({ type: 'logout_user' })
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return (
    <header className={`${styles.header} mainLayout`}>
      <div className={styles['header-mobile-menu']}>
        <NavLink text='Home' href='/' icon='/home.svg' />
        <NavLink text='Favorites' href='/browse/my-list' icon='/heart.svg'/>
        {globalStore.isLoadingAuth
          ? 'loading...'
          : globalStore.isLoggedIn
            ? <NavLink text='Log out' href='/login' icon='/log_out.svg' onClick={handleLogOutClick}/>
            : <NavLink text='Log in' href='/login' icon='/user.svg'/>
        }

      </div>

      <div className={styles['header-top-bar']}>
        <Logo />
        <NavLink text='Home' href='/'/>
        <NavLink text='Favorites' href='/browse/my-list'/>
        <div className={styles.header__dropdown}>
           {globalStore.isLoadingAuth
             ? 'loading...'
             : globalStore.isLoggedIn
               ? <Dropdown text={globalStore.username}>
                  <NavLink text='Log out' href='/login' onClick={handleLogOutClick}/>
                 </Dropdown>
               : <NavLink text='Login' href='/login'/>
           }
        </div>
      </div>
    </header>
  )
}
