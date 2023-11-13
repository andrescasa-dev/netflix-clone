import styles from '@/styles/PreviewModal.module.css'
import Tag from '../atoms/Tag'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PreviewModalSkeleton from '../Skeletons/PreviewModalSkeleton'

export default function PreviewModal ({ movieId }) {
  const [movie, setMovie] = useState(null)
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`/api/videos?id=${movieId}`)
      const { video } = await response.json()
      setMovie(video)
    }
    fetching()
  }, [])

  if (movie === null) return <PreviewModalSkeleton />

  return (
    <article className={styles.preview}>
      <Text type='title' content={movie?.title} />
      <div className={styles['preview__info-wrapper']}>
        <div className={styles.preview__info}>
          <Text type='spaced' content={movie?.publishTime} />
          <Text type='spaced' content={movie?.duration} />
          <Text type='spaced' content={`Content: ${movie?.rating}`} />
        </div>
        <Text type='spaced' content={`By ${movie?.channelTitle}`} />
        <div className={styles.preview__tags}>
          {movie?.category.map((cat, i) => <Tag key={i} text={cat.name} />)}
        </div>
      </div>
      <Text className={styles.preview__description} type='relevant' content={movie?.description} />
      <Link className={styles.preview__btn} href={`/movies/${movieId}?title=${encodeURI(movie?.title)}`}>
        <Button
          text={'Play'}
          hasIcon={true}
          iconUrl={'/play_icon.svg'}
          isFullWidth={true}
        />
      </Link>
    </article>
  )
}
