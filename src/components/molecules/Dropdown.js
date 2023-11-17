import styles from '@/styles/Dropdown.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function Dropdown ({ text, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = (e) => {
    setIsOpen(prevState => !prevState)
  }

  const mapChildren = () => children.map((child, i) => <li key={i}>{child}</li>)

  return (
    <div className={styles.dropdown}>
      <button onClick={handleOpen} className={styles['dropdown__btn-see-options']}>
        {text}
        <Image src='/expand_more_icon.svg' height={30} width={30} alt='arrow down icon'/>
      </button>
      {isOpen &&
      <ul className={styles.dropdown__options}>
        { children.length > 0
          ? mapChildren()
          : children
        }
      </ul>
      }
    </div>
  )
}
