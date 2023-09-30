import { useRouter } from 'next/router'
import ReactModal from 'react-modal'
import styles from '@/styles/VideoModalPage.module.css'
import { getVideosById } from '@/lib/getVideosById'
import Header from '@/components/organisms/Header'

export async function getStaticProps (context) {
  // como le entraga la data al componente
  const { id } = context.params
  const video = await getVideosById(id)
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
  console.log('video', video)

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
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%" // 640
            height="360"
            className={`${styles.videoPlayer} ${styles.borderBoxShadow}`}
            src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0`}
            frameBorder="0">
          </iframe>
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
