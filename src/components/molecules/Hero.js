import Image from 'next/image'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Hero.module.css'
import { useRouter } from 'next/router'

/* TODO
- [] use Context for ctaVideoId?
*/

export default function Hero ({ title, subtitle, imgUrl, backgroundImgUrl, ctaVideoId }) {
  const router = useRouter()
  const handleCTACLick = (e) => {
    router.push(`/videos/${ctaVideoId}`)
  }
  return (
    <div className={`${styles.hero} viewport-layout`}>
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
        <Button text="Play" hasIcon={true} iconUrl={'/play_icon.svg'} handleClick={handleCTACLick}/>
      </div>
    </div>
  )
}
