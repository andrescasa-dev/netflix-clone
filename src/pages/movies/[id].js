import styles from '@/styles/Movie.module.css'
import Header from '@/components/organisms/Header'
import Head from 'next/head'
import Text from '@/components/atoms/Text'
import Icon from '@/components/atoms/Icon'
import PlayButton from '@/components/atoms/PlayButton'
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import Slider from '@/components/atoms/Slider'
import { useRouter } from 'next/router'

/* todo

- [] refactor slider
*/

export default function MoviePage () {
  let timer
  const playerRef = useRef(null)
  const panelRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoTime, setCurrentVideoTime] = useState(0) // range 0-100, where 1000 is 100% complete video
  const router = useRouter()
  const videoId = router.query.id
  const title = decodeURI(router.query.title)
  const [volume, setVolume] = useState(50)

  const handleSetVolume = (e) => {
    setVolume(e.target.value / 100)
  }

  const handleMouseUpProgressBar = (e) => {
    playerRef.current.seekTo(e.target.value / 100, 'fraction')
  }

  const showPanel = () => {
    panelRef.current.classList.remove(styles['opacity-0'])
  }

  const hidePanel = () => {
    panelRef.current.classList.add(styles['opacity-0'])
  }

  const handleOnMove = (e) => {
    clearTimeout(timer)
    showPanel()
    timer = setTimeout(() => {
      console.log('hidding')
      hidePanel()
    }, 6000)
  }

  const handleToggleIsPlaying = (e) => {
    console.log('toggle playing')
    setIsPlaying((prev) => {
      console.log(prev)
      return !prev
    })
  }

  const handleReadyVideo = (e) => {
    if (playerRef.current) {
      setIsPlaying(true)
    }
  }

  const handleVideoProgress = ({ playedSeconds }) => {
    const durationSeconds = playerRef.current.getDuration()
    const currentTime = Math.round(playedSeconds) * 100 / durationSeconds

    if (isPlaying) setCurrentVideoTime(currentTime)
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
        {isClient &&
        <div className={styles.movie__video} >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            volume={Number(volume)}
            playing={isPlaying}
            height={'100%'}
            width={'100%'}
            onPause={() => { showPanel() }}
            onReady={handleReadyVideo}
            onProgress={handleVideoProgress}
            ref={playerRef}
          />
        </div>
        }

        <div className={styles.panel} ref={panelRef} onMouseMove={handleOnMove}>
          <div className={styles.panel__header}>
            <Icon url={'/arrow.svg'} alt={'go back'} />
            <Text content={title} type={'relevant'} />
          </div>
          <div className={styles['panel__video-space']} onClick={handleToggleIsPlaying}></div>
          <div className={styles.panel__menu}>
            <div className={styles.panel__controllers}>
              <PlayButton onClick={handleToggleIsPlaying} />
              <Slider
                syncValue={currentVideoTime}
                handleMouseUp={handleMouseUpProgressBar}
              />
            </div>
            <div className={styles['panel__interaction-buttons']}>
              <div>
                <Slider
                  initValue={volume}
                  handleMouseUp={handleSetVolume}
                />
              </div>
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
