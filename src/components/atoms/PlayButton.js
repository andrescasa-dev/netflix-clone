import styles from '@/styles/PlayButton.module.css'
import Icon from './Icon'

export default function PlayButton () {
  return (
    <button className={styles.button} >
      <Icon url={'/play_icon_dark.svg'} alt={'play movie'}/>
    </button>
  )
}
