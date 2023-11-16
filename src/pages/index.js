import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import MoviesSection from '@/components/molecules/MoviesSection'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import { getPopularVideos, getVideosByCategory } from '@/lib/vimeoLocalSDK'
import Header from '@/components/organisms/Header'

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

  const fetchUserVideos = async () => {
    console.log('fetching watch recent movies')
    const response = await fetch('/api/user/watchedVideos')
    if (!response.ok) {
      console.error('could not fetch user videos')
      return fetchUserVideos()
    }
    const { videos } = await response.json()
    return videos
  }

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
        <MoviesSection subtitle='Popular' sizeOfCards='big' videos={popularVideos} />
        { globalStore.isLoggedIn &&
          <MoviesSection subtitle='Recent watched' sizeOfCards='small' inheritHeight={true} fetchUserVideos={fetchUserVideos}/>
        }
        <MoviesSection subtitle='Horror' sizeOfCards='mid' videos={horrorVideos} />
        <MoviesSection subtitle='Comedy' sizeOfCards='mid' videos={comedyVideos} />
        <MoviesSection subtitle='Documentary' sizeOfCards='mid' videos={documentaryVideos} />
      </main>
    </>
  )
}
