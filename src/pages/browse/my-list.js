import Text from '@/components/atoms/Text'
import MessageToLogin from '@/components/molecules/MessageToLogin'
import MoviesSection from '@/components/molecules/MoviesSection'
import Header from '@/components/organisms/Header'
import useLoadMagicUserAuth from '@/hooks/useLoadMagicUserAuth'
import getLikedVideosByUser from '@/lib/database/getLikedVideosByUser'
import redirectLoginIfNotAuth from '@/lib/ssr/redirectLoginIfNotAuth'
import { useGlobalStore } from '@/stores/GlobalStore'
import Head from 'next/head'

// render liked videos
// insert user valid videos

export async function getServerSideProps (context) {
  try {
    // validate User
    const { userId, userJWT, redirectResponse } = redirectLoginIfNotAuth(context)
    // if (redirectResponse) { return redirectResponse }

    // read data
    const likedVideos = userId ? await getLikedVideosByUser({ userId }, userJWT) : []

    return { props: { likedVideos } }
  } catch (error) {
    console.error(`error in SSR my-list. Error: ${error.message}`)
    return { props: { likedVideos: [] } }
  }
}

export default function MyList ({ likedVideos }) {
  const { globalStore } = useGlobalStore()
  useLoadMagicUserAuth()

  return (
    <>
    <Head>
      <title>My list</title>
    </Head>
    <main className={'mainLayout '}>
      <Header />
      {globalStore.isLogin
        ? likedVideos.length > 0
          ? <MoviesSection isWrap={true} videos={likedVideos} sizeOfCards='big' subtitle='My List' />
          : <Text content={"you don't have any like videos yet"} />
        : <MessageToLogin />
      }
    </main>
    </>
  )
}
