import { useState } from 'react'
import Icon from '../atoms/Icon'
import styles from '@/styles/LikeButtons.module.css'
import Modal from '../atoms/Modal'
import LoginModal from '../organisms/LoginModal'
import { useGlobalStore } from '@/stores/GlobalStore'
import { useRouter } from 'next/router'
import postUserVideoData from '@/lib/browser/postUserVideoData'

export default function LikeButtons ({ clickNoLoggedCB, initValue }) {
  const [value, setValue] = useState(initValue ?? 0) // like: 1, dislike: 2, none of them: 0
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { globalStore } = useGlobalStore()
  const router = useRouter()
  const videoId = router.id || router.query.id

  const updateValueTo = (newValue) => {
    if (globalStore.isLoggedIn) {
      setValue((prev) => {
        const actualValue = prev === newValue ? 0 : newValue
        postUserVideoData({
          videoId,
          likedStatus: actualValue
        })
        return actualValue
      })
    } else {
      clickNoLoggedCB()
      setIsOpenModal(true)
    }
  }

  return (
    <div className={styles.container}>
      <Modal showModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          <LoginModal willUpdateGlobalStore={true} setIsOpenModal={setIsOpenModal}/>
      </Modal>
      <button onClick={ (e) => updateValueTo(1)}>
        <Icon url={ value === 1 ? '/like_filled.svg' : '/like.svg' } alt={'like'} />
      </button>
      <button onClick={ (e) => updateValueTo(2)}>
        <Icon url={ value === 2 ? '/like_filled.svg' : '/like.svg' } isUpsideDown={true} alt={'dislike'} />
      </button>
    </div>
  )
}
