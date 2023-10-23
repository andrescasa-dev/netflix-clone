import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Logo from '@/components/atoms/Logo'
import Head from 'next/head'
import styles from '@/styles/login.module.css'
import { useRef } from 'react'
import magic from '@/lib/magicClient'
import { useRouter } from 'next/router'
import useLoadingRoute from '@/hooks/useLoadingRoute'
import { useGlobalStore } from '@/stores/GlobalStore'

/*  TODO
- [] show the errors catched to de user.
- [] is it possible to encapsulate the magic sign in logic?
*/

export default function Login () {
  const [isLoading, setIsLoading] = useLoadingRoute()
  const { globalStore, dispatchGlobalStore } = useGlobalStore()
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
            await dispatchGlobalStore({
              type: 'update_username',
              payload: {
                username: email
              }
            })
            console.log('globalStore after dispatch in login', globalStore)
            router.push('/')
          } else {
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
    <>
      <Head>
        <title>login</title>
      </Head>
      <header className={styles.header}>
        <Logo size='big' />
      </header>
      <main className={styles.main}>
        <div htmlFor='input' onClick={handleRedirectFocus} className={styles['login-form']}>
          <h1 className={styles['login-form__title']} >Sign In</h1>
          <Input regex={emailRegex} inputRef={inputRef} />
          <Button text={isLoading ? 'loading...' : 'Sign In'} isFullWidth={true} handleClick={handleSubmit}/>
        </div>
      </main>
    </>
  )
}
