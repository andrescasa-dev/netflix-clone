import styles from '@/styles/Subtitle.module.css'

export default function Subtitle ({ text }) {
  return (
    <h2 className={styles.subtitle}>{text}</h2>
  )
}
