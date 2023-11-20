import styles from '@/styles/LoginForm.module.css'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import magic from '@/lib/magicClient'
import { useEffect, useRef, useState } from 'react'
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
      console.log(`could login: ${couldLogin}`)
      if (couldLogin) {
        dispatchGlobalStore({ type: 'load_user', payload: { userEmail: email, isLoggedIn: true } })
        afterSuccessfullyLogin && afterSuccessfullyLogin()
      } else {
        afterUnsuccessfullyLogin && afterUnsuccessfullyLogin()
      }
    } catch (error) {
      console.error('Error in login form ' + error)
    }
    setIsLoading(false)
  }

  const keyPressSubmit = async (e) => {
    if (e.key === 'Enter' && !submitRef.current.disabled) {
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (isLoading) {
      inputRef.current.disabled = true
      submitRef.current.disabled = true
    } else {
      inputRef.current.disabled = false
      submitRef.current.disabled = false
    }
  }, [isLoading])

  return (
    <form onKeyUp={keyPressSubmit} onClick={handleRedirectFocus} className={styles['login-form']}>
      <h1 className={styles['login-form__title']} >Log In</h1>
      <Input regex={emailRegex.current} inputRef={inputRef} onInputValidation={onInputValidation} onEmptyInput={onEmptyInput}/>
      <Button submitRef={submitRef} text={isLoading ? 'loading...' : 'Log In'} isFullWidth={true} handleClick={handleSubmit}/>
    </form>
  )
}
