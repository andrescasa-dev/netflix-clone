import styles from '@/styles/PreviewModal.module.css'
import Skeleton from './Skeleton'

export default function PreviewModalSkeleton () {
  return (
    <article className={`${styles.preview} ${styles['preview-skeleton']}`}>
      <Skeleton height={'6em'} />
      <Skeleton width={'5em'}/>
      <Skeleton height={'3em'} />
      <div className={styles['preview__info-wrapper']}>
        <div className={styles.preview__info}>
          <Skeleton width={'6em'} />
          <Skeleton width={'3em'}/>

        </div>
        <Skeleton />
        <div className={styles.preview__tags}>
          <Skeleton width={'8em'}/>
          <Skeleton width={'4em'}/>
          <Skeleton width={'5em'}/>
          <Skeleton width={'16em'}/>
        </div>
      </div>
      <Skeleton height={'6em'} />
    </article>
  )
}
