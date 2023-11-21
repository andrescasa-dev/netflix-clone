import styles from '@/styles/SideBar.module.css'
import Text from '../atoms/Text'
import { useGlobalStore } from '@/stores/GlobalStore'
import Icon from '../atoms/Icon'
import useLogOut from '@/hooks/useLogOut'

export default function SideBar ({ onClose }) {
  const { globalStore } = useGlobalStore()
  const logOut = useLogOut()

  return (
    <div className={styles['side-bar']}>
      <div className={styles['side-bar__header']}>
        <button onClick={(e) => onClose(e)}>
          <Icon url={'/arrow.svg'} size='small' alt={'go back'} />
        </button>
        <div className={styles['side-bar__item']}>
          <Text type='relevant' content={globalStore.username} />
          <Icon url={'/user.svg'} size='small' alt={'user'} />
        </div>
      </div>
      <button className={styles['side-bar__item']} onClick={() => { logOut() }}>
        <Icon url={'/log_out.svg'} size='small' alt={'log out'} />
        <Text type='normal' content={'Log Out'} />
      </button>
    </div>
  )
}
