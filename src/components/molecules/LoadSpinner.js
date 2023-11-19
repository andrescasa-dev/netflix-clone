import styles from '@/styles/LoadSpinner.module.css'

export default function LoadSpinner ({ size = 'big' }) {
  return (
    <div className={`${styles['lds-ring']} ${styles[`lds-ring--${size}`]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
