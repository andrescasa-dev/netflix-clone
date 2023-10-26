import styles from '@/styles/Movie.module.css'
import Header from '@/components/organisms/Header'
import Head from 'next/head'
import Text from '@/components/atoms/Text'
import Icon from '@/components/atoms/Icon'
import PlayButton from '@/components/atoms/PlayButton'

export default function MoviePage () {
  return (
    <>
      <Head>
        <title>Movie</title>
      </Head>
      <main>
        {/* https://www.youtube.com/watch?v=P7jA9S-Qbpk */}
        <iframe
          className={styles.movie__video}
          id="ytplayer"
          type="text/html"
          width="100%"
          src={'https://www.youtube.com/embed/P7jA9S-Qbpk?autoplay=1&controls=0&'}
          frameBorder="0">
        </iframe>
        <div className={styles.panel}>
          <div className={styles.panel__header}>
            <Icon url={'/arrow.svg'} alt={'go back'} />
            <Text content={'Tierra de nadie'} type={'relevant'} />
          </div>
          <Text content={'Tierra de nadie'} type={'title'} />
          <div className={styles.panel__menu}>
            <div className={styles.panel__controllers}>
              <PlayButton />
              <div className={styles['panel__controllers__video-bar']}></div>
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
