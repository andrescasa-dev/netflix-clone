import styles from '@/styles/Modal.module.css'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Image from 'next/image'
import { createPortal } from 'react-dom'

export function useModal () {
  const modal = useRef(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    console.log('click on close')
    setIsOpenModal(false)
  }

  const Modal = ({ children }) => {
    useEffect(() => {
      if (modal?.current !== null) {
        if (isOpenModal) {
          document.body.classList.add('no-scroll')
          modal.current.showModal()
        }
      }
      return () => {
        document.body.classList.remove('no-scroll')
      }
    }, [isOpenModal])

    const handlePressKeyClose = (e) => {
      if (e.key === 'Escape') {
        console.log('modal press key close')
        closeModal()
      }
    }

    return (
      <>
      {isOpenModal && createPortal(<dialog ref={modal} className={styles.modal} onKeyDown={handlePressKeyClose}>
        <Image
          priority={true}
          className={styles['modal--background-image']}
          src='/signin-bg.jpeg'
          fill={true}
          alt='background image'
        />
        {children}
        <div className={styles.modal__close_btn_container}>
          <button onClick={() => closeModal()}>
            <Icon size='small' url={'/exit.svg'} alt='views' />
          </button>
        </div>
      </dialog>, document.body)}
      </>
    )
  }

  return { Modal, openModal, closeModal }
}
