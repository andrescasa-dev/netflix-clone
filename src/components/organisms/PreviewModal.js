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
    <article className={styles.modal}>
      <Text type='title' content={movie?.title} />
      <div className={styles['modal__info-wrapper']}>
        <div className={styles.modal__info}>
          <Text type='spaced' content={movie?.publishTime} />
          <Text type='spaced' content={movie?.duration} />
          <Text type='spaced' content={`Content: ${movie?.rating}`} />
        </div>
        <Text type='spaced' content={`By ${movie?.channelTitle}`} />
        <div className={styles.modal__tags}>
          <Tag text={movie?.definition.toUpperCase()} />
          <Tag text={movie?.category} />
        </div>
      </div>
      <Text className={styles.modal__description} type='relevant' content={movie?.description} />
      <Link className={styles.modal__btn} href={`/movies/${movieId}?title=${encodeURI(movie?.title)}`}>
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
