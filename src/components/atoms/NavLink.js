import styles from '@/styles/NavLink.module.css'
import Icon from './Icon'
import { useRouter } from 'next/router'

export default function NavLink ({ text, href, icon, onClick }) {
  const router = useRouter()

  const handleClick = (e) => {
    onClick && onClick(e)
    router.push(href)
  }

  return (
    <a className={styles['nav-link']} onClick={handleClick}>
      {icon && <Icon url={icon} alt={text} size='small'/>}
      {text}
    </a>
  )
}
