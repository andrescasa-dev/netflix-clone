import Logo from '@/components/atoms/Logo'
import Head from 'next/head'
import styles from '@/styles/login.module.css'
import LoginForm from '@/components/organisms/LoginForm'
import { useRouter } from 'next/router'

export default function Login () {
  const router = useRouter()
  const handleSuccessfullyLogin = () => {
    router.push('/')
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
        <LoginForm afterSuccessfullyLogin={handleSuccessfullyLogin} />
      </main>
    </>
  )
}
