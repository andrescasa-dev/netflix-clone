import MoviesSection from '@/components/molecules/MoviesSection'
import Header from '@/components/organisms/Header'
import getLikedVideosByUser from '@/lib/database/getLikedVideosByUser'
import { getVideosByIdArray } from '@/lib/getVideosById'
import redirectLoginIfNotAuth from '@/lib/ssr/useVerifyUser'
import Head from 'next/head'

// render liked videos
// insert user valid videos

export async function getServerSideProps (context) {
  try {
    // validate User
    const { userId, userJWT, redirectResponse } = redirectLoginIfNotAuth(context)
    if (redirectResponse) { return redirectResponse }

    // read data
    console.log('reading user liked videos')
    const likedVideosIdArray = await getLikedVideosByUser({ userId }, userJWT)
    const likedVideos = getVideosByIdArray(likedVideosIdArray)

    return { props: { likedVideos } }
  } catch (error) {
    console.error(`error in SSR my-list. Error: ${error.message}`)
    return { props: { likedVideos: [] } }
  }
}

export default function MyList ({ likedVideos }) {
  console.log(likedVideos)
  return (
    <>
    <Head>
      <title>My list</title>
    </Head>
    <main className={'mainLayout '}>
      <Header />
      <MoviesSection isWrap={true} videos={likedVideos} sizeOfCards='big' subtitle='My List' />
    </main>
    </>
  )
}
