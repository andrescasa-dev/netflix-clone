import styles from '@/styles/Skeleton.module.css'

export default function Skeleton ({ className, width = 'none', height = 'none' }) {
  const inlineStyles = { width, height }
  return (
    <div style={inlineStyles} className={`${styles.skeleton} ${className}`}></div>
  )
}
