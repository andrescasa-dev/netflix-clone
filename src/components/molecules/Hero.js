import Image from 'next/image'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Hero.module.css'

// styles.container => hero
// styles.contentContainer => hero__container
// styles.title => hero__title

export default function Hero ({ title, subtitle, imgUrl, backgroundImgUrl }) {
  return (
    <div className={styles.hero}>
      <Image
        fill={true}
        src={backgroundImgUrl}
        alt='background hero image'
        objectFit='cover'
      />
      <div className={`${styles.hero__container} mainLayout`}>
        <Image src={imgUrl} height={90} width={50} alt="Netflix logo" />
        <h1 className={styles.hero__title}>{title}</h1>
        <p>{subtitle}</p>
        <Button text="Play" hasIcon={true} iconUrl={'/play_icon.svg'}/>
      </div>
    </div>
  )
}
