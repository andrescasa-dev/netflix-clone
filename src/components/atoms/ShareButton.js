import { useState } from 'react'
import Icon from './Icon'

export default function ShareButton () {
  const [active, setActive] = useState(false)
  const toggle = () => {
    setActive(prev => !prev)
  }
  return (
    <button onMouseDown={toggle} onMouseUp={toggle}>
      <Icon url={ active ? '/share_filled.svg' : '/share.svg'} alt={'share'} />
    </button>
  )
}
