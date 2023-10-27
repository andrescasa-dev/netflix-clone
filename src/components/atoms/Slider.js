import styles from '@/styles/Slider.module.css'
export default function Slider ({ currentValue, handleInput, handleMouseUp }) {
  return (
    <div className={styles.container}>
      <input className={styles.slider} type="range" min="0" max="100" step='0.01' value={currentValue} onInput={handleInput} onMouseUp={handleMouseUp}/>
    </div>
  )
}
