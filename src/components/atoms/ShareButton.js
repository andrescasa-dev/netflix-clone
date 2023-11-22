import { useState } from 'react'
import Icon from './Icon'
import { useRouter } from 'next/router'

export default function ShareButton () {
  const [active, setActive] = useState(false)
  const router = useRouter()
  const toggle = () => {
    setActive(prev => !prev)
  }

  const handleClick = () => {
    const urlActual = window.location.origin + router.asPath
    navigator.clipboard.writeText(urlActual)
      .then(() => {
        console.log('Texto copiado al portapapeles')
      })
      .catch(err => {
        console.error('Error al copiar el texto: ', err)
      })
  }
  return (
    <button onMouseDown={toggle} onMouseUp={toggle} onTouchStart={toggle} onTouchEnd={toggle} onClick={handleClick}>
      <Icon url={ active ? '/share_filled.svg' : '/share.svg'} alt={'share'} />
    </button>
  )
}
