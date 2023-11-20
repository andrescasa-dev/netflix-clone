import styles from '@/styles/Movie.module.css'
import Head from 'next/head'
import Text from '@/components/atoms/Text'
import Icon from '@/components/atoms/Icon'
import PlayButton from '@/components/atoms/PlayButton'
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import Slider from '@/components/atoms/Slider'
import { useRouter } from 'next/router'
import LikeButtons from '@/components/molecules/LikeButtons'
import ShareButton from '@/components/atoms/ShareButton'
import Link from 'next/link'
import Header from '@/components/organisms/Header'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import queryUserVideoData from '@/lib/database/queryUserVideoData'
import postUserVideoData from '@/lib/browser/postUserVideoData'
import { useModal } from '@/components/atoms/Modal'
import LoginForm from '@/components/organisms/LoginForm'

export async function getServerSideProps (context) {
  const { userEmail, userJWT, userId, isLoggedIn } = checkUserAuth(context.req.cookies)
  const videoId = context.params.id

  const userVideoData = isLoggedIn
    ? await queryUserVideoData({ userId, videoId }, userJWT)
    : []

  return { props: { userVideoData, auth: { userEmail, isLoggedIn } } }
}

export default function MoviePage ({ userVideoData, auth }) {
  const timer = useRef(null)
  const playerRef = useRef(null)
  const panelRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoTime, setCurrentVideoTime] = useState(0) // range 0-100, where 1000 is 100% complete video
  const router = useRouter()
  const videoId = router.query.id
  const title = decodeURI(router.query.title)
  const [volume, setVolume] = useState(50)
  const { openModal, closeModal, Modal } = useModal()
  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleOnStart = (e) => {
    const date = new Date()
    postUserVideoData({
      videoId,
      watchedAt: date.toISOString()
    }).then((data) => console.log('mutation for watchedAt, data: ', data))
  }

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
    if (timer.current) clearTimeout(timer.current)
    showPanel()
    timer.current = setTimeout(() => {
      hidePanel()
    }, 1300)
  }

  const handleToggleIsPlaying = (e) => {
    setIsPlaying((prev) => !prev)
  }

  const handleVideoProgress = ({ playedSeconds }) => {
    const durationSeconds = playerRef.current.getDuration()
    const currentTime = Math.round(playedSeconds) * 100 / durationSeconds

    if (isPlaying) setCurrentVideoTime(currentTime)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  console.log('isLogged in user: ', auth)
  useLoadGlobalStoreAuth(auth)
  return (
    <>
      <Head>
        <title>Movie</title>
      </Head>
      <Header />
      <main className={styles.movie}>
        <Modal>
            <LoginForm
              beforeShowUIMagic={() => closeModal()}
              afterUnsuccessfullyLogin={ () => openModal()}
            />
        </Modal>
        {isClient &&
        <div className={styles.movie__video} >
          <ReactPlayer
            url={`https://vimeo.com/${videoId}`}
            volume={Number(volume) / 100}
            playing={isPlaying}
            height={'100%'}
            width={'100%'}
            onStart={handleOnStart}
            onPause={() => { showPanel() }}
            onProgress={handleVideoProgress}
            ref={playerRef}
          />
        </div>
        }

        <div className={styles.panel} ref={panelRef} onMouseMove={handleOnMove}>
          <div className={styles.panel__header}>
            <Link href={'/'} scroll={false}>
              <Icon url={'/arrow.svg'} alt={'go back'} />
            </Link>
            <Text content={title} type={'relevant'} />
          </div>
          <div className={styles['panel__video-space']} onClick={handleToggleIsPlaying}></div>
          <div className={styles.panel__menu}>
            <div className={styles.panel__controllers}>
              <PlayButton onClick={handleToggleIsPlaying} isPlaying={isPlaying} />
              <Slider
                syncValue={currentVideoTime}
                handleMouseUp={handleMouseUpProgressBar}
              />
            </div>
            <div className={styles['panel__interaction-buttons']}>
              <div className={styles.volume}>
                <Icon url={'/volume.svg'} alt={'volume'} />
                <Slider
                  initValue={volume}
                  handleMouseUp={handleSetVolume}
                />
              </div>
              <LikeButtons initValue={userVideoData.likedStatus} clickNoLoggedCB={ () => { setIsPlaying(false); openModal() }} />
              <ShareButton />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
