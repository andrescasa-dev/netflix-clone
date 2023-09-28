import styles from '@/styles/Input.module.css'
import { useEffect, useState } from 'react'

export default function Input ({ regex, inputRef }) {
  const [text, setText] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)

  useEffect(() => {
    // handle correct email
    if (regex) {
      setIsValidInput(regex.test(text))
    }
  }, [text])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className={styles['input-wrapper']}>
      <div className={styles.input}>
        <input
          ref={inputRef}
          onChange={handleChange}
          placeholder="some@emial.com"
          value={text}
        />
      </div>
      {!isValidInput &&
      <p className={styles['input-wrapper__error']}>Please enter a valid Email</p>
      }
    </div>

  )
}
