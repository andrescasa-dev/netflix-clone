import styles from '@/styles/MovieCard.module.css'
import Image from 'next/image'

export default function MovieCard ({ size, imgUrl, alt }) {
  //       w   h
  // big: 218x432
  // mid: 158x280
  // small: 300x170
  console.log(styles)
  const getContainerSize = () => {
    switch (size) {
      case 'big':
        return styles['container--big']
      case 'mid':
        return styles['container--mid']
      case 'small':
        return styles['container--small']
      default:
        return styles['container--small']
    }
  }

  return (
    <article className={`${styles.container} ${getContainerSize()} ${styles.hoverEffect}`}>
      <Image style={{ borderRadius: '.4em' }} fill={true} objectFit='cover' src={imgUrl} alt={alt}/>
    </article>
  )
}
