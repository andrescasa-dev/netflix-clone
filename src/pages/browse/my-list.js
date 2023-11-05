import Text from '@/components/atoms/Text'
import MessageToLogin from '@/components/molecules/MessageToLogin'
import MoviesSection from '@/components/molecules/MoviesSection'
import Header from '@/components/organisms/Header'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import getLikedVideosByUser from '@/lib/database/getLikedVideosByUser'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import Head from 'next/head'

// render liked videos
// insert user valid videos

export async function getServerSideProps (context) {
  try {
    const { userEmail, userJWT, userId, isLoggedIn } = checkUserAuth(context.req.cookies)

    // read data
    const likedVideos = isLoggedIn ? await getLikedVideosByUser({ userId }, userJWT) : []

    return { props: { likedVideos, auth: { userEmail, isLoggedIn } } }
  } catch (error) {
    console.error(`error in SSR my-list. Error: ${error.message}`)
    return { props: { likedVideos: [] } }
  }
}

export default function MyList ({ likedVideos, auth }) {
  const globalStore = useLoadGlobalStoreAuth(auth)
  return (
    <>
    <Head>
      <title>My list </title>
    </Head>
    <main className={'mainLayout '}>
      <Header />
      { globalStore.isLoadingAuth
        ? <p>loading...</p>
        : globalStore.isLoggedIn
          ? likedVideos.length > 0
            ? <MoviesSection isWrap={true} videos={likedVideos} sizeOfCards='big' subtitle='My List' />
            : <Text content={"you don't have any like videos yet"} />
          : <MessageToLogin />
      }
    </main>
    </>
  )
}
