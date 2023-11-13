import styles from '@/styles/MessageToLogin.module.css'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function MessageToLogin () {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Text type='title' content={'It seems that you are not logged in'}/>
        <Image src={'/photographer.svg'} height={200} width={236} alt={'please log in image'}/>
        <Text className={styles.description} type='normal' content={'log in or register to continue taking advantage of our services.'}/>
        <Link href={'/login'}>
          <Button text={'log in'} />
        </Link>
      </div>
    </div>
  )
}
