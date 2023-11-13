import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import PreviewModal from '../organisms/PreviewModal'
import { useModal } from './Modal'

export default function MovieCard ({ size = 'mid', imgUrl = '', alt = 'movie not found', id }) {
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

  const hoverEffect = id === 1 ? styles['hoverEffect--first-element'] : styles.hoverEffect

  return (
    <article className={`${styles.card} ${sizeMap[`${size}`]} ${hoverEffect}`} >
      <Modal>
        <PreviewModal movieId={ id } />
      </Modal>
      <div onClick={() => openModal()} >
        <Image
            fill={true}
            objectFit='cover'
            src={finalImgUrl}
            alt={alt}
            onError={handleError}
          />
      </div>
    </article>
  )
}
