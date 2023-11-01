import styles from '@/styles/Modal.module.css'
import { useEffect, useRef } from 'react'
import Icon from './Icon'
import Image from 'next/image'

export default function Modal ({ showModal, setIsOpenModal, children, backgroundUrl, imgUrl }) {
  const modal = useRef(null)

  useEffect(() => {
    if (modal !== null) {
      if (showModal) {
        modal.current.showModal()
        document.body.classList.add('no-scroll')
      } else {
        closeModal()
      }
    }
  }, [showModal])

  const closeModal = () => {
    document.body.classList.remove('no-scroll')
    modal.current.close()
    setIsOpenModal(false)
  }

  const handleClose = (e) => {
    console.log('modal click close')
    closeModal()
  }

  const handlePressKeyClose = (e) => {
    console.log('modal press key close')
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  const backgroundClass = backgroundUrl && styles['modal--background-image']

  return (
    <dialog ref={modal} className={`${styles.modal} ${backgroundClass}`} onKeyDown={handlePressKeyClose}>
      <div className={styles['modal--background-image']}>
        <Image
          src='/signin-bg.jpeg' fill={true} objectFit='cover'
          alt='background image'
        />
      </div>
      <div className={styles.modal__close_btn_container}>
        <button onClick={handleClose}>
          <Icon url={'/exit.svg'} alt='views' />
        </button>
      </div>
      {children}
    </dialog>
  )
}
