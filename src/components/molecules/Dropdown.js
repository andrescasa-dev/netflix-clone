import styles from '@/styles/Dropdown.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Dropdown ({ text }) {
  const [isOpen, setIsOpen] = useState(false)

  const openHandler = (e) => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div className={styles.dropdown}>
      <button onClick={openHandler} className={styles['dropdown__btn-see-options']}>
        {text}
        <Image src='/expand_more_icon.svg' height={30} width={30} alt='arrow down icon'/>
      </button>
      {isOpen &&
      <ul className={styles.dropdown__options}>
        <li>
          <Link href='/'>Log Out</Link>
        </li>
      </ul>
      }
    </div>
  )
}
