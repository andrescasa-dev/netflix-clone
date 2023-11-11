import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import Header from '@/components/organisms/Header'
import MoviesSection from '@/components/molecules/MoviesSection'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import { getPopularVideos, getVideosByIds } from '@/lib/vimeoLocalSDK'
import getWatchedVideoIdsByUser from '@/lib/database/getWatchedVideosByUser'

const robotSlab = Roboto_Slab({ subsets: ['latin'] })

export async function getServerSideProps (context) {
  try {
    const horrorVideos = []
    const comedyVideos = []
    const documentaryVideos = []
    const popularVideos = await getPopularVideos()
    // const horrorVideos = await getVideosByCategory('horror')
    // const comedyVideos = await getVideosByCategory('comedy')
    // const documentaryVideos = await getVideosByCategory('documentary')
    // const popularVideos = await getPopularVideos()

    const { userEmail, userJWT, isLoggedIn } = checkUserAuth(context.req.cookies)
    const watchedVideos = isLoggedIn ? await getVideosByIds(await getWatchedVideoIdsByUser(userJWT)) : []

    const auth = { isLoggedIn, userEmail }
    const videos = { horrorVideos, comedyVideos, documentaryVideos, popularVideos, watchedVideos }

    return { props: { videos, auth } }
  } catch (error) {
    console.error('error in SSR home')
    console.error(error)
    const videos = { horrorVideos: [], comedyVideos: [], documentaryVideos: [], popularVideos: [], watchedVideos: [] }
    const auth = { isLoggedIn: false }
    return { props: { videos, auth } }
  }
}

export default function Home ({ videos, auth }) {
  useLoadGlobalStoreAuth(auth)
  const { horrorVideos, comedyVideos, documentaryVideos, popularVideos, watchedVideos } = videos
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
