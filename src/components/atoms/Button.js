import styles from '@/styles/Button.module.css'
import Image from 'next/image'

export default function Button ({ text, hasIcon, iconUrl }) {
  return (
    <button className={styles.button}>
      {hasIcon && <Image src={iconUrl} width={30} height={30} alt='play icon' />}
      {text}
    </button>
  )
}
