import styles from '@/styles/Tag.module.css'
import Text from './Text'

export default function Tag ({ text }) {
  return (
    <div className={styles.tag}>
      <Text type='normal' content={text} />
    </div>
  )
}
