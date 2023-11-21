import Logo from '@/components/atoms/Logo'
import Dropdown from '@/components/molecules/Dropdown'
import styles from '@/styles/Header.module.css'
import { useGlobalStore } from '@/stores/GlobalStore'
import LoadSpinner from '../molecules/LoadSpinner'
import MobileNavMenu from './MobileNavMenu'
import Link from 'next/link'
import Text from '../atoms/Text'
import useLogOut from '@/hooks/useLogOut'

export default function Header () {
  const { globalStore } = useGlobalStore()
  const logOut = useLogOut()

  return (
    <>
      <MobileNavMenu />
      <header className={`mainLayout ${styles.header}`}>
        <nav className={styles.header__nav}>
          <Logo />
          <Link href={'/'} className={styles.header__item}>
            <Text type='normal' content={'Home'} />
          </Link>
          <Link href={'/browse/favorites'} className={styles.header__item}>
            <Text type='normal' content={'Favorites'} />
          </Link>
          <div className={styles.header__dropdown}>
              {globalStore.isLoadingAuth
                ? <LoadSpinner size='small' />
                : globalStore.isLoggedIn
                  ? <Dropdown text={globalStore.username}>
                      <button className={styles.header__item} onClick={() => { logOut() }}>
                        <Text type='normal' content={'Log Out'} />
                      </button>
                    </Dropdown>
                  : <Link href={'/login'} className={styles.header__item}>
                      <Text type='normal' content={'Log In'} />
                    </Link>
              }
          </div>
        </nav>
      </header>
    </>
  )
}
