import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'
import { useState } from 'react'
import PreviewModal from '../organisms/PreviewModal'
import { useModal } from './Modal'

export default function MovieCard ({ size = 'mid', imgUrl = '', alt = 'movie not found', id, inheritHeight = true, imgBase64 }) {
  const [finalImgUrl, setFinalImgUrl] = useState(imgUrl)
  const { Modal, openModal } = useModal()

  const handleError = (e) => {
    console.error('Error loading image of MovieCard')
    setFinalImgUrl(process.env.NEXT_PUBLIC_DEFAULT_IMG_URL)
  }

  const resolution = {
    big: '40vw',
    mid: '35vw',
    small: '35vw'
  }

  const inheritHeightClass = inheritHeight ? styles['card--inherit-height'] : ''
  const hoverEffect = id === 1 ? styles['hoverEffect--first-element'] : styles.hoverEffect

  return (
    <article className={`${styles.card} ${styles[`card--${size}`]} ${hoverEffect} ${inheritHeightClass}`} >
      <Modal>
        <PreviewModal movieId={ id } />
      </Modal>
      <Image
          onClick={() => openModal()}
          className={styles.card__image}
          sizes={`(min-width: 500px) ${resolution[size]}, 80vw`}
          fill={true}
          src={finalImgUrl}
          alt={alt}
          onError={handleError}
          placeholder='blur'
          blurDataURL={imgBase64}
        />
    </article>
  )
}
