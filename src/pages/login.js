import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Logo from '@/components/atoms/Logo'
import Head from 'next/head'
import styles from '@/styles/login.module.css'
import { useRef, useState } from 'react'
import magic from '@/lib/magicClient'
import { useRouter } from 'next/router'

/*  TODO
- [] show the errors catched to de user.
- [] is it possible to encapsulate the magic sign in logic?
*/

export default function Login () {
  const [loadingMagic, setLoadingMagic] = useState(false)
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
        setLoadingMagic(true)
        const email = String(inputRef.current.value)
        const didToken = await magic.auth.loginWithMagicLink({ email: 'test+success@magic.link' })
        if (didToken) {
          console.log('didToken', didToken)
          setLoadingMagic(false)
        } else {
          setLoadingMagic(false)
          throw new Error("didToken wasn't return")
        }
      } catch (error) {
        console.error('Error while login with magic Error: ' + error)
      }
      router.push('/')
    } else {
      console.log('not redirect')
    }
    // si es correcto el email redirect to home
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
          <Button text={loadingMagic ? 'loading...' : 'Sign In'} isFullWidth={true} handleClick={handleSubmit}/>
        </div>
      </main>
    </>
  )
}
