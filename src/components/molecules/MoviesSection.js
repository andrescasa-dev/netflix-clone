import styles from '@/styles/MoviesSection.module.css'
import MovieCard from '../atoms/MovieCard'
import Subtitle from '../atoms/Subtitle'

export default function MoviesSection ({ subtitle = 'subtitle', sizeOfCards = 'mid', videos = [], isWrap = false, hover = true }) {
  const videoComponents = videos.map((video, i) => {
    return (
      <MovieCard
        id={video.id}
        key={video.id || i}
        size={sizeOfCards}
        imgUrl={video.imgUrl}
        alt={video.imgAlt}
      />
    )
  })
  const wrap = isWrap ? styles['movies-section__cards-container--wrap'] : ''
  return (
    <section className={styles['movies-section']}>
      <Subtitle text={subtitle} />
      <div className={styles.scroll}>
        <div className={`${styles['movies-section__cards-container']} ${wrap} `}>
          {videoComponents}
        </div>
      </div>
    </section>
  )
}
