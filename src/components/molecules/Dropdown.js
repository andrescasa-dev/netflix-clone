import styles from '@/styles/Dropdown.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// make open funcitonality, use a state and conditional render the options.

/* Questions
- Is there any semantic problem about not having only one parent container (one for dropdown and options) for dropdown?
*/

export default function Dropdown ({ text }) {
  const [isOpen, setIsOpen] = useState(false)

  const openHandler = (e) => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div className={styles.container}>
        <button onClick={openHandler} className={styles.dropdown}>
          {text}
          <Image src='/expand_more_icon.svg' height={30} width={30} alt='arrow down icon'/>
        </button>
      {isOpen &&
      <ul className={styles.optionsContainer}>
        <li>
          <Link href='/'>Log Out</Link>
        </li>
      </ul>
      }
    </div>
  )
}
