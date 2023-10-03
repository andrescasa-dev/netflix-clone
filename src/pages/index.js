import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import Header from '@/components/organisms/Header'
import MoviesSection from '@/components/molecules/MoviesSection'
import { getVideosBySearch } from '@/lib/getVideosBySearch'
import { getPopularVideosByLocation } from '@/lib/getPopularVideosByLocation'
import { useEffect, useState } from 'react'
import magic from '@/lib/magicClient'
import { AuthContext } from '@/lib/context'
import getWatchedVideosByUser from '@/lib/database/getWatchedVideosByUser'
import { getVideosByIdArray } from '@/lib/getVideosById'
import redirectIfNotAuth from '@/lib/ssr/useVerifyUser'

const robotSlab = Roboto_Slab({ subsets: ['latin'] })

export async function getServerSideProps (context) {
  try {
    // calling YouTube API
    const actionVideos = await getVideosBySearch('action')
    const horrorVideos = await getVideosBySearch('horror')
    const popularVideos = await getPopularVideosByLocation(['21.5922529', '-158.1147114'])

    // handling no authUsers
    const { userId, userJWT, redirectResponse } = redirectIfNotAuth(context)
    if (redirectResponse) { return redirectResponse }

    // get the user videos from my DB
    const watchedVideosIdArray = await getWatchedVideosByUser({ userId }, userJWT)
    // get the videos from YT
    const watchedVideos = getVideosByIdArray(watchedVideosIdArray) 

    // send data via props to the client side component
    return { props: { actionVideos, horrorVideos, popularVideos, watchedVideos } }
  } catch (error) {
    console.error('error in SSR home')
    console.error(error)
    return { props: { videosData: [] } }
  }
}

export default function Home (props) {
  const { horrorVideos, actionVideos, popularVideos, watchedVideos } = props
  const [userName, setUsername] = useState('')

  useEffect(() => {
    async function getUsername () {
      try {
        const { email } = await magic.user.getMetadata()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.log('Error retrieving email:', error)
      }
    }
    getUsername()
  }, [])

  // startFetchMyQuery()

  return (
    <>
      <Head>
        <title>Local Netflix Clone</title>
        <meta name="description" content="NextJS practice project, a basic Netflix clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider value={{ userName, setUsername }}>
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
      </AuthContext.Provider>
    </>
  )
}
