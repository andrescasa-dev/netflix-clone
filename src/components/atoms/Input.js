import styles from '@/styles/Input.module.css'
import { useEffect, useState } from 'react'

export default function Input ({ regex, inputRef, onInputValidation, onEmptyInput }) {
  const [text, setText] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)

  useEffect(() => {
    if (text === '') {
      onEmptyInput && onEmptyInput()
    }
    if (text !== '' && !!regex) {
      const isValid = regex.test(text)
      setIsValidInput(isValid)
      onInputValidation && onInputValidation(isValid)
    }
  }, [text])

  return (
    <div className={styles['input-wrapper']}>
      <div className={styles.input}>
        <input
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
          placeholder="some@emial.com"
          value={text}
        />
      </div>
      {!!regex &&
      <p className={`${styles['input-wrapper__error']} ${isValidInput ? 'hide' : ''}`}>Please enter a valid Email</p>
      }
    </div>

  )
}
