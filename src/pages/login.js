import Logo from '@/components/atoms/Logo'
import Head from 'next/head'
import styles from '@/styles/login.module.css'
import LoginModal from '@/components/organisms/LoginModal'

/*  TODO
- [] show the errors catched to de user.
- [] is it possible to encapsulate the magic sign in logic?
*/

export default function Login () {
  return (
    <>
      <Head>
        <title>login</title>
      </Head>
      <header className={styles.header}>
        <Logo size='big' />
      </header>
      <main className={styles.main}>
        <LoginModal willRedirectToHome={true} />
      </main>
    </>
  )
}
