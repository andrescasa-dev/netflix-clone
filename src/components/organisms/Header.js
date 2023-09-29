import Logo from '@/components/atoms/Logo'
import NavLink from '@/components/atoms/NavLink'
import Dropdown from '@/components/molecules/Dropdown'
import { AuthContext } from '@/lib/context'
import styles from '@/styles/Header.module.css'
import { useContext } from 'react'
import magic from '@/lib/magicClient'
import { useRouter } from 'next/router'

export default function Header () {
  const auth = useContext(AuthContext)
  const router = useRouter()
  // await magic.user.isLoggedIn()
  const handleMagicLogOut = async (e) => {
    try {
      e.preventDefault()
      await magic.user.logout()
      auth.setUsername(undefined)
      router.push('/login')
    } catch {
      console.error("couldn't log out from magic")
    }
  }

  return (
    <header className={`${styles.header} mainLayout`}>
      <div className={styles.header__content}>
        <Logo />
        <NavLink text='Home' href='/'/>
        <NavLink text='My List' href='/my-list'/>
        <div className={styles.header__dropdown}>
           <Dropdown text={auth.userName} handleClick={handleMagicLogOut} />
        </div>
      </div>
    </header>
  )
}
