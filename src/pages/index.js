import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import Header from '@/components/organisms/Header'
import MoviesSection from '@/components/molecules/MoviesSection'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import { getPopularVideos, getVideosByCategory, getVideosByIds } from '@/lib/vimeoLocalSDK'
import getWatchedVideoIdsByUser from '@/lib/database/getWatchedVideosByUser'
import { useEffect, useState } from 'react'

const robotSlab = Roboto_Slab({ subsets: ['latin'] })

export async function getStaticProps (context) {
  try {
    const horrorVideos = await getVideosByCategory('horror')
    const comedyVideos = await getVideosByCategory('comedy')
    const documentaryVideos = await getVideosByCategory('documentary')
    const popularVideos = await getPopularVideos()

    const videos = { horrorVideos, comedyVideos, documentaryVideos, popularVideos }

    return { props: { videos }, revalidate: 60 }
  } catch (error) {
    console.error('error in ISR home')
    console.error(error)
    const videos = { horrorVideos: [], comedyVideos: [], documentaryVideos: [], popularVideos: [] }
    return { props: { videos } }
  }
}

export default function Home ({ videos }) {
  const globalStore = useLoadGlobalStoreAuth({ isBrowserValidation: true })

  const [watchedVideos, setWatchedVideos] = useState([])

  const fetchingUserVideos = async () => {
    const response = await fetch('/api/user/watchedVideos')
    const { videos } = await response.json()
    console.log('user videos loaded', videos)
    setWatchedVideos(videos)
  }

  useEffect(() => {
    if (globalStore.isLoggedIn) {
      fetchingUserVideos()
    }
  }, [])

  const { horrorVideos, comedyVideos, documentaryVideos, popularVideos } = videos
  return (
    <>
      <Head>
        <title>Local Netflix Clone</title>
        <meta name="description" content="NextJS practice project, a basic Netflix clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`mainLayout ${robotSlab.className}`}>
        <Header />
        <Hero
          backgroundImgUrl='/clifford.webp'
          imgUrl='/logo.webp'
          title={'Clifford the red dog'}
          subtitle={'A very cute dog'}
          ctaVideoId={'ma67yOdMQfs'}
        />
        <MoviesSection sizeOfCards='big' videos={popularVideos} subtitle='Popular'/>
        {watchedVideos?.length > 0 && <MoviesSection sizeOfCards='small' videos={watchedVideos} subtitle='Recent watched'/>}
        <MoviesSection sizeOfCards='mid' videos={horrorVideos} subtitle='Horror'/>
        <MoviesSection sizeOfCards='mid' videos={comedyVideos} subtitle='Comedy'/>
        <MoviesSection sizeOfCards='mid' videos={documentaryVideos} subtitle='Documentary'/>
      </main>
    </>
  )
}
