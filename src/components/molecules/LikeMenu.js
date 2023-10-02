import styles from '@/styles/LikeMenu.module.css'
import LikeButton from '../atoms/LikeButton'
import { useState } from 'react'

// change the dislike and like logic, children should be independent
export default function LikeMenu () {
  // should recibe the initial props of the like video
  // para ello cada que se carge un video modal se tiene que ver si está en la DB
  const [toggleLike, setToggleLike] = useState(false)
  const [toggleDisLike, setToggleDisLike] = useState(false)

  const handleToggleLike = async () => {
    setToggleLike(!toggleLike)
    setToggleDisLike(toggleLike)
    // mutate user_video
    // use fetch with using AuthCookie
  }

  const handleToggleDislike = async () => {
    setToggleDisLike(!toggleDisLike)
    setToggleLike(toggleDisLike)
  }

  return (
    <div className={styles['like-menu']}>
      <LikeButton isLikeVariation={true} onClick={handleToggleLike} active={toggleLike} />
      <LikeButton isLikeVariation={false} onClick={handleToggleDislike} active={toggleDisLike} />
    </div>
  )
}
