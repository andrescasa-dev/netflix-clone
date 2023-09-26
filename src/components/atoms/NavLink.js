import Link from 'next/link'
import styles from '@/styles/NavLink.module.css'

export default function Header ({ text, href }) {
  return (
    <Link className={styles['nav-link']} href={href}>
      {text}
    </Link>
  )
}
