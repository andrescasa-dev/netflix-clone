import styles from '@/styles/Button.module.css'
import Image from 'next/image'

export default function Button ({ text, hasIcon = false, iconUrl, isFullWidth = false, handleClick }) {
  const classIsFullWidth = isFullWidth ? styles['button--full-width'] : ''
  return (
    <button className={`${styles.button} ${classIsFullWidth}`} onClick={handleClick}>
      {hasIcon && <Image src={iconUrl} width={30} height={30} alt='play icon' />}
      {text}
    </button>
  )
}
