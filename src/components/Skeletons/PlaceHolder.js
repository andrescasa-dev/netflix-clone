import styles from '@/styles/PlaceHolder.module.css'

export default function PlaceHolder ({ className }) {
  return (
    <div className={`${styles.skeleton} ${className}`}></div>
  )
}
