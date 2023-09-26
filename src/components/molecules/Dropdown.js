import styles from '@/styles/Dropdown.module.css'
import Image from 'next/image'

// make open funcitonality, use a state and conditional render the options.

export default function Dropdown ({ text }) {
  return (
    <div className={styles.dropdown}>
      <button>{text}</button>
      <Image src='/expand_more_icon.svg' height={30} width={30} alt='arrow down icon'/>
    </div>
  )
}
