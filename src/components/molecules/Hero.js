import Image from 'next/image'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Hero.module.css'

export default function Hero ({ title, subtitle, imgUrl, backgroundImgUrl }) {
  return (
    <div className={styles.container}>
      <Image
        fill={true}
        src={backgroundImgUrl}
        alt='background hero image'
        objectFit='cover'
      />
      <div className={`${styles.contentContainer} mainLayout`}>
        <Image src={imgUrl} height={90} width={50} alt="Netflix logo" />
        <h1 className={styles.title}>{title}</h1>
        <p>{subtitle}</p>
        <Button text="Play" hasIcon={true} iconUrl={'/play_icon.svg'}/>
      </div>
    </div>
  )
}
