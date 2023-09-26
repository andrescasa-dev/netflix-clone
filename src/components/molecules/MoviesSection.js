import styles from '@/styles/MoviesSection.module.css'
import MovieCard from '../atoms/MovieCard'
import Subtitle from '../atoms/Subtitle'

export default function MoviesSection ({ subtitle = 'subtitle', sizeOfCards = 'mid', videos = [] }) {
  const videoComponents = videos.map((video) => {
    return (
      <MovieCard
        id={video.id}
        key={video.id}
        size={sizeOfCards}
        imgUrl={video.imgUrl}
        alt={video.imgAlt}
      />
    )
  })

  return (
    <section className={styles['movies-section']}>
      <Subtitle text={subtitle} />
      <div className={styles.scroll}>
        <div className={styles['movies-section__cards-container']}>
          {videoComponents}
        </div>
      </div>
    </section>
  )
}
