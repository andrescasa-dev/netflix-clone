import styles from '@/styles/PlayButton.module.css'
import Icon from './Icon'

export default function PlayButton ({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <Icon url={'/play_icon_dark.svg'} alt={'play movie'}/>
    </button>
  )
}
