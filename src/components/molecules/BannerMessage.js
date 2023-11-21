import styles from '@/styles/BannerMessage.module.css'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function BannerMessage ({ title, description, img, link }) {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Text type='title' content={title}/>
        {img && <Image src={img.src} height={200} width={236} alt={img.alt}/>}
        <Text className={styles.description} type='normal' content={description}/>
        {link && <Link href={link.href}>
          <Button text={link.text} />
        </Link>}
      </div>
    </div>
  )
}
