import styles from '@/styles/PlayButton.module.css'
import Icon from './Icon'

export default function PlayButton ({ onClick, isPlaying }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <Icon url={ isPlaying ? '/pause.svg' : '/play_icon_dark.svg'} alt={'play button'}/>
    </button>
  )
}
