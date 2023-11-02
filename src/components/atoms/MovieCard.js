import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'
import PreviewModal from '../organisms/PreviewModal'

export default function MovieCard ({ size = 'mid', imgUrl = '', alt = 'movie not found', id }) {
  const [finalImgUrl, setFinalImgUrl] = useState(imgUrl)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClick = (e) => {
    setIsOpenModal(true)
  }

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
      <Modal showModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          <PreviewModal movieId={ id } />
      </Modal>
      <div onClick={handleClick}>
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
