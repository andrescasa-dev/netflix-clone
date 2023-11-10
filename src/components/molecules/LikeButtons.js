import { useState } from 'react'
import Icon from '../atoms/Icon'
import styles from '@/styles/LikeButtons.module.css'
import { useGlobalStore } from '@/stores/GlobalStore'
import { useRouter } from 'next/router'
import postUserVideoData from '@/lib/browser/postUserVideoData'

export default function LikeButtons ({ clickNoLoggedCB, initValue }) {
  const [value, setValue] = useState(initValue ?? 0) // like: 1, dislike: 2, none of them: 0
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
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={ (e) => updateValueTo(1)}>
        <Icon url={ value === 1 ? '/like_filled.svg' : '/like.svg' } alt={'like'} />
      </button>
      <button onClick={ (e) => updateValueTo(2)}>
        <Icon url={ value === 2 ? '/like_filled.svg' : '/like.svg' } isUpsideDown={true} alt={'dislike'} />
      </button>
    </div>
  )
}
