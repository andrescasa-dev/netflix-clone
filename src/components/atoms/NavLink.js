import Link from 'next/link'
import styles from '@/styles/NavLink.module.css'

export default function NavLink ({ text, href }) {
  return (
    <Link className={styles['nav-link']} href={href}>
      {text}
    </Link>
  )
}
