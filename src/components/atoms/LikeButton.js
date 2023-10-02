import Image from 'next/image'
import styles from '@/styles/LikeButton.module.css'

export default function LikeButton ({ isLikeVariation, onClick, active }) {
  const iconUrl = isLikeVariation ? '/like_icon.svg' : '/dislike_icon.svg'
  const alt = isLikeVariation ? 'like button' : 'dislike button'
  // const [active, setActive] = useState(false)
  const activeClass = active ? styles['like-button--active'] : ''

  // const activeHandler = (e) => {
  //   setActive((prevState) => !prevState)
  // }

  return (
    <div className={`${styles['like-button']} ${activeClass}`} onClick={onClick}>
      <Image width={34} height={34} src={iconUrl} alt={alt}></Image>
    </div>
  )
}
