import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'
import { useState } from 'react'
import PreviewModal from '../organisms/PreviewModal'
import { useModal } from './Modal'

export default function MovieCard ({ size = 'mid', imgUrl = '', alt = 'movie not found', id, inheritHeight = true }) {
  const [finalImgUrl, setFinalImgUrl] = useState(imgUrl)
  const { Modal, openModal } = useModal()

  const handleError = (e) => {
    console.error('Error loading image of MovieCard')
    setFinalImgUrl(process.env.NEXT_PUBLIC_DEFAULT_IMG_URL)
  }

  const sizeMap = {
    big: styles['card--big'],
    mid: styles['card--mid'],
    small: styles['card--small']
  }

  const inheritHeightClass = inheritHeight ? styles['card--inherit-height'] : ''

  const hoverEffect = id === 1 ? styles['hoverEffect--first-element'] : styles.hoverEffect

  return (
    <article className={`${styles.card} ${sizeMap[`${size}`]} ${hoverEffect} ${inheritHeightClass}`} >
      <Modal>
        <PreviewModal movieId={ id } />
      </Modal>
      <Image
          onClick={() => openModal()}
          className={styles.card__image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill={true}
          src={finalImgUrl}
          alt={alt}
          onError={handleError}
        />
    </article>
  )
}
