import styles from '@/styles/MessageToLogin.module.css'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Link from 'next/link'

export default function MessageToLogin () {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Text type='title' content={'It seems that you are not logged in'}/>
        <Text className={styles.description} type='normal' content={'To access to your account. Register or log in to continue taking advantage of our services.'}/>
        <Link href={'/login'}>
          <Button text={'log in'} />
        </Link>
      </div>
    </div>
  )
}
