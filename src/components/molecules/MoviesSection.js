import styles from '@/styles/MoviesSection.module.css'
import MovieCard from '../atoms/MovieCard'
import Subtitle from '../atoms/Subtitle'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '@/stores/GlobalStore'
import LoadSpinner from './LoadSpinner'

export default function MoviesSection ({ subtitle = 'subtitle', sizeOfCards = 'mid', videos = null, isWrap = false, fetchUserVideos, inheritHeight = true }) {
  const [cards, setCards] = useState(videos)
  const { globalStore } = useGlobalStore()

  useEffect(() => {
    if (globalStore.isLoggedIn) {
      fetchUserVideos && fetchUserVideos().then(videos => setCards(videos))
    }
  }, [])

  const cardComponents = cards?.map((video, i) => {
    return (
      <MovieCard
        id={video.id}
        key={video.id || i}
        size={sizeOfCards}
        imgUrl={video.imgUrl}
        imgColor={video.imgColor}
        alt={video.imgAlt}
        inheritHeight = {inheritHeight}
      />
    )
  })

  const wrap = isWrap ? styles['movies-section--wrap'] : ''

  if (cards?.length === 0) return false

  return (
    <section className={`${styles['movies-section']} ${wrap}`}>
      <Subtitle text={subtitle} />
      <div className={styles.scroll}>
        <div className={`${styles['movies-section__cards-container']} ${styles[`movies-section__cards-container--${sizeOfCards}`]} `}>
          { cards !== null
            ? cardComponents
            : <LoadSpinner />
          }
        </div>
      </div>
    </section>
  )
}
