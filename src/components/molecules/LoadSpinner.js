import styles from '@/styles/LoadSpinner.module.css'

export default function LoadSpinner () {
  return (
    <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
  )
}
