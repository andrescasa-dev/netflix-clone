import Link from 'next/link'
import styles from '@/styles/NavLink.module.css'

export default function Header ({ text }) {
  return (
    <Link className={styles.navLink} href={'/'}>
      {text}
    </Link>
  )
}
