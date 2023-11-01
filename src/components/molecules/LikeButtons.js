import { useState } from 'react'
import Icon from '../atoms/Icon'
import styles from '@/styles/LikeButtons.module.css'
/* esto se puede hacer perfectamente con dos botnes que
 sus icones depandan del estado si este es "like" uno es blanco y el otro es negro,
 si es "dislike" al reves y si es "undefined" entonces los dos son negros.

 handleLike cambie el estado entre like y undefined
 handleDislike cambie el estado entre dislike y undefined
 */
export default function LikeButtons () {
  const [value, setValue] = useState(null) // "like" | "dislike" | null
  const toggleLike = () => {
    setValue((prev) => {
      return prev === 'like' ? null : 'like'
    })
  }
  const toggleDislike = () => {
    setValue((prev) => {
      return prev === 'dislike' ? null : 'dislike'
    })
  }
  return (
    <div className={styles.container}>
      <button onClick={toggleLike}>
        <Icon url={ value === 'like' ? '/like_filled.svg' : '/like.svg' } alt={'like'} />
      </button>
      <button onClick={toggleDislike}>
        <Icon url={ value === 'dislike' ? '/like_filled.svg' : '/like.svg' } isUpsideDown={true} alt={'dislike'} />
      </button>
    </div>
  )
}
