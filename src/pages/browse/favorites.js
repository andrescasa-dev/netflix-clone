import BannerMessage from '@/components/molecules/BannerMessage'
import LoadSpinner from '@/components/molecules/LoadSpinner'
import MoviesSection from '@/components/molecules/MoviesSection'
import Header from '@/components/organisms/Header'
import useLoadGlobalStoreAuth from '@/hooks/useLoadGlobalStoreAuth'
import getLikedVideoIdsByUser from '@/lib/database/getLikedVideoIdsByUser'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import { getVideosByIds } from '@/lib/vimeoLocalSDK'
import Head from 'next/head'

export async function getServerSideProps (context) {
  try {
    const { userEmail, userJWT, userId, isLoggedIn } = checkUserAuth(context.req.cookies)

    const likedVideos = isLoggedIn ? await getVideosByIds(await getLikedVideoIdsByUser({ userId }, userJWT)) : []

    return { props: { likedVideos, auth: { userEmail, isLoggedIn } } }
  } catch (error) {
    console.error(`error in SSR favorites. Error: ${error.message}`)
    return { props: { likedVideos: [] } }
  }
}

export default function MyList ({ likedVideos, auth }) {
  const globalStore = useLoadGlobalStoreAuth(auth)
  console.log('likedVideos', likedVideos)
  return (
    <>
    <Head>
      <title>Favorites</title>
    </Head>
    <Header />
    <main className={'mainLayout screen-height'}>
      { globalStore.isLoadingAuth
        ? <LoadSpinner />
        : globalStore.isLoggedIn
          ? likedVideos.length > 0
            ? <MoviesSection
                subtitle='Favorites'
                videos={likedVideos}
                sizeOfCards='big'
                isWrap={true}
                inheritHeight={false}
              />
            : <BannerMessage
                title="Your Favorites List is Empty"
                description="Start liking movies and shows to create your favorites list."
                img={{ src: '/photographer.svg', alt: 'please log in image' }}
                link={{ href: '/', text: 'Explore' }}
              />
          : <BannerMessage
              title='It seems that you are not logged in'
              description='log in or register to continue taking advantage of our services.'
              img={{ src: '/photographer.svg', alt: 'please log in image' }}
              link={{ href: '/login', text: 'log in' }}
            />
      }
    </main>
    </>
  )
}
