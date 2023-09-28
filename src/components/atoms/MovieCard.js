import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function MovieCard ({ size = 'mid', imgUrl = '', alt, id }) {
  const [finalImgUrl, setFinalImgUrl] = useState(imgUrl)

  const sizeMap = {
    big: styles['card--big'],
    mid: styles['card--mid'],
    small: styles['card--small']
  }

  const handleError = (e) => {
    console.error('Error loading image of MovieCard')
    setFinalImgUrl(process.env.NEXT_PUBLIC_DEFAULT_IMG_URL)
  }

  const hoverEffect = id === 1 ? styles['hoverEffect--first-element'] : styles.hoverEffect

  return (
    <article className={`${styles.card} ${sizeMap[`${size}`]} ${hoverEffect}`}>
        <Image
          fill={true}
          objectFit='cover'
          src={finalImgUrl}
          alt={alt}
          onError={handleError}
        />
    </article>
  )
}
