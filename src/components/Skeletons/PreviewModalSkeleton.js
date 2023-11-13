import styles from '@/styles/PreviewModal.module.css'
import PlaceHolder from './PlaceHolder'

export default function PreviewModalSkeleton () {
  return (
    <article className={styles.modal}>
      <PlaceHolder />
      <div className={styles['modal__info-wrapper']}>
        <div className={styles.modal__info}>
          <PlaceHolder />
          <PlaceHolder />
          <PlaceHolder />
        </div>
        <PlaceHolder />
        <div className={styles.modal__tags}>
          <PlaceHolder />
          <PlaceHolder />
        </div>
      </div>
      <PlaceHolder className={styles.modal__description} />
      <PlaceHolder />
    </article>
  )
}
