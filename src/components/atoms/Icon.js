import Image from 'next/image'
import styles from '@/styles/Icon.module.css'

export default function Icon ({ url, alt, isUpsideDown, className, size = 'normal' }) {
  const upsideDownClass = isUpsideDown && styles['icon--upside-down']
  const finalClassName = `${upsideDownClass} ${className}`
  const sizeDictionary = {
    small: 18,
    normal: 32
  }
  return (
    <Image className={finalClassName} src={url} height={sizeDictionary[size]} width={sizeDictionary[size]} alt={alt} />
  )
}
