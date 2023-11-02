import styles from '@/styles/LoginModal.module.css'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import magic from '@/lib/magicClient'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useGlobalStore } from '@/stores/GlobalStore'

export default function LoginModal ({ willRedirectToHome = false, willUpdateGlobalStore = false, setIsOpenModal }) {
  if (!willRedirectToHome && !willUpdateGlobalStore) console.warn('nothing will happen after user login, set willRedirectToHome or willUpdateGlobalStore')
  if (willUpdateGlobalStore && !setIsOpenModal) console.error('when modal will update global store, setIsOpenModal have to be provided')
  const [isLoading, setIsLoading] = useState(false)
  const { dispatchGlobalStore } = useGlobalStore()
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com|es$/i
  const inputRef = useRef(null)
  const router = useRouter()

  const handleRedirectFocus = (e) => {
    inputRef.current.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValidInput = emailRegex.test(inputRef.current.value)
    if (isValidInput) {
      try {
        const email = String(inputRef.current.value)
        setIsLoading(true)
        if (willUpdateGlobalStore) setIsOpenModal(false)
        const didToken = await magic.auth.loginWithMagicLink({ email })
        if (didToken) {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${didToken}`,
              'Content-Type': 'application/json'
            }
          })
          const { couldLogin } = await response.json()
          if (couldLogin) {
            willRedirectToHome && router.push('/')
            if (willUpdateGlobalStore) {
              dispatchGlobalStore({ type: 'login_user', payload: { email } })
              setIsLoading(false)
            }
          } else {
            if (willUpdateGlobalStore) setIsOpenModal(true)
            setIsLoading(false)
          }
        } else {
          throw new Error("didToken wasn't return")
        }
      } catch (error) {
        setIsLoading(false)
        console.error('Error while login with magic Error: ' + error)
      }
    } else {
      console.log('not redirect')
    }
  }

  return (
    <div htmlFor='input' onClick={handleRedirectFocus} className={styles['login-form']}>
      <h1 className={styles['login-form__title']} >Log In</h1>
      <Input regex={emailRegex} inputRef={inputRef} />
      <Button text={isLoading ? 'loading...' : 'Log In'} isFullWidth={true} handleClick={handleSubmit}/>
    </div>
  )
}
