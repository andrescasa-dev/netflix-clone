import Logo from '@/components/atoms/Logo'
import NavLink from '@/components/atoms/NavLink'
import Dropdown from '@/components/molecules/Dropdown'
import styles from '@/styles/Header.module.css'

export default function Header () {
  return (
    <header className={`${styles.header} mainLayout`}>
      <div className={styles.container}>
        <Logo />
        <NavLink text='Home'/>
        <NavLink text='My List'/>
        <div className={styles.dropdownWrapper}>
           <Dropdown text='andrescasa@gmail.com' />
        </div>
      </div>
    </header>
  )
}
