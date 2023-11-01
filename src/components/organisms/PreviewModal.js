import styles from '@/styles/PreviewModal.module.css'
import Tag from '../atoms/Tag'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getVideoDetailExample } from '@/lib/videoExample'
import LikeButtons from '../molecules/LikeButtons'
/*
TODO
-[ ] too large title => make this smaller
-[ ] too large description => smaller and
-[ ] parse view count
*/
export default function PreviewModal ({ movieId }) {
  const [movie, setMovie] = useState(null)
  useEffect(() => {
    // fetch data
    const data = getVideoDetailExample()
    setMovie(data)
  }, [])

  const shortenText = (text) => {
    if (!text) return text
    const maxCharacters = 300
    if (text.length > maxCharacters) {
      const shortText = text.slice(0, maxCharacters)
      const lastPointIndex = shortText.lastIndexOf('.')
      return lastPointIndex !== -1 ? shortText.slice(0, lastPointIndex + 1) : shortText
    }
    return text
  }

  return (
    <article className={styles.modal}>
      <Text type='title' content={movie?.title} />
      <div>
        <div className={styles.modal__info}>
          <Text type='spaced' content={movie?.publishTime} />
          <Text type='spaced' content={movie?.duration} />
          <Tag text={movie?.definition.toUpperCase()} />
          {movie?.hasCaption && <Tag text={'CC'} />}
          <Tag text={movie?.category} />
        </div>
        <Text type='normal' content={`Producido por: ${movie?.channelTitle}`} />
      </div>
      <Text type='relevant' content={shortenText(movie?.description)} />
      <div className={styles.modal__stats}>
        <div className={styles.modal__stats__views}>
          {/* to do: make this a component icon */}
          <Icon url={'/eye.svg'} alt='views' />
          <Text type='normal' content={movie?.viewCount} />
        </div>
      </div>
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
