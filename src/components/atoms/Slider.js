import styles from '@/styles/Slider.module.css'
import { useEffect, useState } from 'react'

// the slider value state and the state of the parent are separated, i want that the parent state only change when mouseUp, in order to prevent bugs in the video player
export default function Slider ({ handleMouseUp, syncValue, initValue }) {
  const [value, setValue] = useState(syncValue ?? initValue)
  const [isChanging, setIsChanging] = useState(false)
  useEffect(() => {
    // sync the stateful variable currentValue to the value of the slider
    if (syncValue && !isChanging) {
      setValue(syncValue)
    }
  }, [syncValue])

  const handleDrag = () => {
    setIsChanging(true)
  }

  const handleOnInput = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.slider}
        type="range"
        min="0"
        max="100"
        step='0.01'
        value={value}
        onInput={handleOnInput}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onTouchStart={handleDrag}
        onMouseDown={handleDrag}
      />
    </div>
  )
}
