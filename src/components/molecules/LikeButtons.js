import { useState } from 'react'
import Icon from '../atoms/Icon'
import styles from '@/styles/LikeButtons.module.css'
import Modal from '../atoms/Modal'
import LoginModal from '../organisms/LoginModal'
import { useGlobalStore } from '@/stores/GlobalStore'

export default function LikeButtons ({ onNoLoggedClick }) {
  const [value, setValue] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { globalStore } = useGlobalStore()

  const toggleLike = (e) => {
    if (globalStore.isLoggedIn) {
      setValue((prev) => {
        return prev === 'like' ? null : 'like'
      })
    } else {
      onNoLoggedClick()
      setIsOpenModal(true)
    }
  }
  const toggleDislike = (e) => {
    if (globalStore.isLoggedIn) {
      setValue((prev) => {
        return prev === 'dislike' ? null : 'dislike'
      })
    } else {
      onNoLoggedClick()
      setIsOpenModal(true)
    }
  }
  return (
    <div className={styles.container}>
      <Modal showModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          <LoginModal willUpdateGlobalStore={true} setIsOpenModal={setIsOpenModal}/>
      </Modal>
      <button onClick={toggleLike}>
        <Icon url={ value === 'like' ? '/like_filled.svg' : '/like.svg' } alt={'like'} />
      </button>
      <button onClick={toggleDislike}>
        <Icon url={ value === 'dislike' ? '/like_filled.svg' : '/like.svg' } isUpsideDown={true} alt={'dislike'} />
      </button>
    </div>
  )
}
