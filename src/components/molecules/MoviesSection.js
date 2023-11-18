import styles from '@/styles/MoviesSection.module.css'
import MovieCard from '../atoms/MovieCard'
import Subtitle from '../atoms/Subtitle'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '@/stores/GlobalStore'
import LoadSpinner from './LoadSpinner'

export default function MoviesSection ({ subtitle = 'subtitle', sizeOfCards = 'mid', videos = [], isWrap = false, hover = true, fetchUserVideos, inheritHeight = true }) {
  const [cards, setCards] = useState(videos ?? [])
  const { globalStore } = useGlobalStore()

  useEffect(() => {
    if (globalStore.isLoggedIn) {
      fetchUserVideos && fetchUserVideos().then(videos => setCards(videos))
    }
  }, [])

  const cardComponents = cards.map((video, i) => {
    return (
      <MovieCard
        id={video.id}
        key={video.id || i}
        size={sizeOfCards}
        imgUrl={video.imgUrl}
        imgBase64={video.imgBase64}
        alt={video.imgAlt}
        inheritHeight = {inheritHeight}
      />
    )
  })

  const wrap = isWrap ? styles['movies-section__cards-container--wrap'] : ''
  return (
    <section className={`${styles['movies-section']}`}>
      <Subtitle text={subtitle} />
      <div className={styles.scroll}>
        <div className={`${styles['movies-section__cards-container']} ${styles[`movies-section__cards-container--${sizeOfCards}`]} ${wrap} `}>
          { cards.length > 0
            ? cardComponents
            : <LoadSpinner />
          }
        </div>
      </div>
    </section>
  )
}
