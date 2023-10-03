import styles from '@/styles/LikeMenu.module.css'
import LikeButton from '../atoms/LikeButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

/* Todo
-[ ] change the dislike and like logic, children should be independent
-[ ] make the call to the DB in the page componente
*/
export default function LikeMenu () {
  // should recibe the initial props of the like video
  // para ello cada que se carge un video modal se tiene que ver si está en la DB
  const [toggleLike, setToggleLike] = useState(false)
  const [toggleDisLike, setToggleDisLike] = useState(false)

  const router = useRouter()
  const { id: videoId } = router.query

  const handleToggleLike = async () => {
    setToggleLike(!toggleLike)
    setToggleDisLike(toggleLike)

    fetch('/api/userVideoData', {
      method: 'POST',
      body: JSON.stringify({
        hasWatched: false,
        videoId,
        likedStatus: 1
      })
    })
  }

  const handleToggleDislike = async () => {
    setToggleDisLike(!toggleDisLike)
    setToggleLike(toggleDisLike)

    fetch('/api/userVideoData', {
      method: 'POST',
      body: JSON.stringify({
        hasWatched: false,
        videoId,
        likedStatus: 2
      })
    })
  }

  useEffect(() => {
    async function fetchVideoData () {
      try {
        const response = await fetch(`/api/userVideoData?videoId=${videoId}`)
        const { userVideoData } = await response.json()
        const { likedStatus } = userVideoData
        if (likedStatus === 1) { setToggleLike(true) }
        if (likedStatus === 2) { setToggleDisLike(true) }
      } catch (error) {
        console.error(`filed to fetch user data. Error: ${error.message}`)
      }
    }
    fetchVideoData()
  }, [])

  return (
    <div className={styles['like-menu']}>
      <LikeButton isLikeVariation={true} onClick={handleToggleLike} active={toggleLike} />
      <LikeButton isLikeVariation={false} onClick={handleToggleDislike} active={toggleDisLike} />
    </div>
  )
}
