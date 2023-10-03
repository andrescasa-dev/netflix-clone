import { useRouter } from 'next/router'
import ReactModal from 'react-modal'
import styles from '@/styles/VideoModalPage.module.css'
import Header from '@/components/organisms/Header'
import LikeMenu from '@/components/molecules/LikeMenu'
import { getVideoDetailExample } from '@/lib/videoExample'

export async function getStaticProps (context) {
  // como le entrega la data al componente
  const { id } = context.params
  const video = getVideoDetailExample()
  return {
    props: {
      video: video ?? {}
    },
    revalidate: 10
  }
}

export async function getStaticPaths () {
  // cuales son los paths que son SSG
  const popularVideos = ['ppezPGQJ8Yw', '19nt1L8nLrA', '1xNJ_LZTgZA'] // LNorpMtgaVY

  const paths = popularVideos.map((id) => ({
    params: { id }
  }))

  return { paths, fallback: 'blocking' }
}

export default function VideoModalPage ({ video }) {
  const router = useRouter()
  const { id } = router.query

  const { title, description, publishDate, viewCount, channelTitle } = video
  return (
    <div>
      <Header />
      <ReactModal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <div className={styles['video-modal']}>
          <div className={styles.video}>
            <iframe
              id="ytplayer"
              type="text/html"
              width="100%" // 640
              height="360"
              className={`${styles.video__player} ${styles.borderBoxShadow}`}
              src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0`}
              frameBorder="0">
            </iframe>
            <LikeMenu />
          </div>
          <div className={styles.about}>
            <p>{publishDate}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className={styles['more-info']}>
            <p>Cast: {channelTitle}</p>
            <p>View Count: {viewCount}</p>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
