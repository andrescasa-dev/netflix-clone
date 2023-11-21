import { useGlobalStore } from '@/stores/GlobalStore'
import LoadSpinner from '../molecules/LoadSpinner'
import styles from '@/styles/MobileNavMenu.module.css'
import { useState } from 'react'
import Text from '../atoms/Text'
import SideBar from './SideBar'
import Icon from '../atoms/Icon'
import Link from 'next/link'

export default function MobileNavMenu () {
  const { globalStore } = useGlobalStore()

  // this should be a hook
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <nav className={styles.menu}>
          {isSideBarOpen && <SideBar onClose={ () => { setIsSideBarOpen(false) }} /> }
          <Link href={'/'} className={styles.menu__item}>
            <Icon url={'/home.svg'} size='small' alt={'home'} />
            <Text type='normal' content={'Home'} />
          </Link>
          <Link href={'/browse/my-list'} className={styles.menu__item}>
            <Icon url={'/heart.svg'} size='small' alt={'my favorites'} />
            <Text type='normal' content={'Favorites'} />
          </Link>
          {globalStore.isLoadingAuth
            ? <LoadSpinner size='small' />
            : globalStore.isLoggedIn
              ? <button className={styles.menu__item} onClick={() => { setIsSideBarOpen(true) }}>
                  <Icon url={'/user.svg'} size='small' alt={'user'} />
                  <Text type='normal' content={'account'} />
                </button>
              : <Link href={'/login'} className={styles.menu__item}>
                  <Icon url={'/user.svg'} size='small' alt={'log in'} />
                  <Text type='normal' content={'Log In'} />
                </Link>
          }
    </nav>
  )
}
