import styles from '@/styles/LoginModal.module.css'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import magic from '@/lib/magicClient'
import { useRef, useState } from 'react'
import { useGlobalStore } from '@/stores/GlobalStore'

export default function LoginForm ({ afterSuccessfullyLogin, afterUnsuccessfullyLogin, beforeShowUIMagic }) {
  const emailRegex = useRef(/^[\w._]+(@[\w]{2,})+\.[\w]{2,}$/i)
  const inputRef = useRef(null)
  const submitRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatchGlobalStore } = useGlobalStore()

  const onEmptyInput = () => {
    submitRef.current.disabled = true
  }

  const onInputValidation = (isValidInput) => {
    submitRef.current.disabled = !isValidInput
  }

  const handleRedirectFocus = (e) => {
    inputRef.current.focus()
  }

  const login = async (email) => {
    const didToken = await magic.auth.loginWithMagicLink({ email })
    if (!didToken) {
      console.log('didToken was not returned')
      return false
    }
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${didToken}`,
        'Content-Type': 'application/json'
      }
    })
    const { couldLogin } = await response.json()
    return couldLogin
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const email = String(inputRef.current.value)
      beforeShowUIMagic && beforeShowUIMagic()
      const couldLogin = await login(email)
      console.log('couldLogin', couldLogin)
      if (couldLogin) {
        dispatchGlobalStore({ type: 'login_user', payload: { username: email } })
        afterSuccessfullyLogin && afterSuccessfullyLogin()
      } else {
        afterUnsuccessfullyLogin && afterUnsuccessfullyLogin()
      }
    } catch (error) {
      console.error('Error in login form ' + error)
    }
    setIsLoading(false)
  }

  return (
    <div onClick={handleRedirectFocus} className={styles['login-form']}>
      <h1 className={styles['login-form__title']} >Log In</h1>
      <Input regex={emailRegex.current} inputRef={inputRef} onInputValidation={onInputValidation} onEmptyInput={onEmptyInput}/>
      <Button submitRef={submitRef} text={isLoading ? 'loading...' : 'Log In'} isFullWidth={true} handleClick={handleSubmit}/>
    </div>
  )
}
