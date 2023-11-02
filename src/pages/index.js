import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import Header from '@/components/organisms/Header'
import MoviesSection from '@/components/molecules/MoviesSection'
import { getVideosBySearch } from '@/lib/getVideosBySearch'
import { getPopularVideosByLocation } from '@/lib/getPopularVideosByLocation'
import getWatchedVideosByUser from '@/lib/database/getWatchedVideosByUser'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'

const robotSlab = Roboto_Slab({ subsets: ['latin'] })

export async function getServerSideProps (context) {
  try {
    const actionVideos = await getVideosBySearch('action')
    const horrorVideos = await getVideosBySearch('horror')
    const popularVideos = await getPopularVideosByLocation(['21.5922529', '-158.1147114'])

    const { userEmail, userJWT, userId, isLoggedIn } = checkUserAuth(context)
    // if (redirectResponse) { return redirectResponse }
    const watchedVideos = isLoggedIn ? await getWatchedVideosByUser({ userId }, userJWT) : []

    return { props: { actionVideos, horrorVideos, popularVideos, watchedVideos, auth: { isLoggedIn, userEmail } } }
  } catch (error) {
    console.error('error in SSR home')
    console.error(error)
    return { props: { videosData: [] } }
  }
}

export default function Home ({ horrorVideos, actionVideos, popularVideos, watchedVideos, auth }) {
  // useLoadMagicUserAuth()
  useLoadGlobalStoreAuth(auth)

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
        <MoviesSection sizeOfCards='big' videos={horrorVideos} subtitle='Horror'/>
        {watchedVideos?.length > 0 && <MoviesSection sizeOfCards='mid' videos={watchedVideos} subtitle='Recent watched'/>}
        <MoviesSection sizeOfCards='mid' videos={actionVideos} subtitle='Action'/>
        <MoviesSection sizeOfCards='small' videos={popularVideos} subtitle='Popular'/>
      </main>
    </>
  )
}
