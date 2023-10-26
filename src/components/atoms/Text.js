import styles from '@/styles/Text.module.css'

export default function Text ({ content, type = 'normal' }) {
  // title, spaced, normal, relevant
  return (
    <p className={styles[`text--${type}`]}>{content}</p>
  )
}
