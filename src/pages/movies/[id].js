import styles from '@/styles/Movie.module.css'
import Header from '@/components/organisms/Header'
import Head from 'next/head'
import Text from '@/components/atoms/Text'
import Icon from '@/components/atoms/Icon'
import PlayButton from '@/components/atoms/PlayButton'
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import Slider from '@/components/atoms/Slider'

export default function MoviePage () {
  const playerRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentRange, setCurrentRange] = useState(0) // range 0-100, where 1000 is 100% complete video

  const handleToggleIsPlaying = (e) => {
    setIsPlaying((prev) => !prev)
  }

  const handleReadyVideo = (e) => {
    if (playerRef.current) {
      console.log(playerRef.current.getDuration())
      setIsPlaying(true)
    }
  }

  const handleVideoProgress = ({ playedSeconds }) => {
    const durationSeconds = playerRef.current.getDuration()
    const result = Math.round(playedSeconds) * 100 / durationSeconds
    if (isPlaying) setCurrentRange(result)
  }

  const handleInputBar = (e) => {
    setIsPlaying(false)
    setCurrentRange(e.target.value)
  }

  const handleBarMouseUp = (e) => {
    playerRef.current.seekTo(e.target.value / 100, 'fraction')
    setIsPlaying(true)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head>
        <title>Movie</title>
      </Head>
      <main className={styles.movie}>
        {/* https://www.youtube.com/watch?v=P7jA9S-Qbpk */}
        {/* <iframe
          className={styles.movie__video}
          id="ytplayer"
          type="text/html"
          width="100%"
          src={'https://www.youtube.com/embed/P7jA9S-Qbpk?autoplay=1&controls=0&'}
          frameBorder="0">
        </iframe> */}

        {isClient &&
        <div className={styles.movie__video} >
          <ReactPlayer
            url={'https://www.youtube.com/watch?v=P7jA9S-Qbpk'}
            playing={isPlaying}
            height={'100%'}
            width={'100%'}
            onReady={handleReadyVideo}
            onProgress={handleVideoProgress}
            ref={playerRef}
          />
        </div>
        }

        <div className={styles.panel}>
          <div className={styles.panel__header}>
            <Icon url={'/arrow.svg'} alt={'go back'} />
            <Text content={'Tierra de nadie'} type={'relevant'} />
          </div>
          <Text content={'Tierra de nadie'} type={'title'} />
          <div className={styles.panel__menu}>
            <div className={styles.panel__controllers}>
              <PlayButton onClick={handleToggleIsPlaying} />
              <Slider currentValue={currentRange} handleInput={handleInputBar} handleMouseUp={handleBarMouseUp}/>
            </div>
            <div className={styles['panel__interaction-buttons']}>
              <Icon url={'/like.svg'} alt={'like'} />
              <Icon url={'/like.svg'} alt={'dislike'} isUpsideDown={true}/>
              <Icon url={'/share.svg'} alt={'share'} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
