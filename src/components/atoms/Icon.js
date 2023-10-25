import Image from 'next/image'
import styles from '@/styles/Icon.module.css'

export default function Icon ({ url, alt, isUpsideDown, className }) {
  const upsideDownClass = isUpsideDown && styles['icon--upside-down']
  const finalClassName = `${upsideDownClass} ${className}`
  return (
    <Image className={finalClassName} src={url} height={32} width={32} alt={alt} />
  )
}
