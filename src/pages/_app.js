import NextNProgress from 'nextjs-progressbar'
import GlobalStore from '@/stores/GlobalStore'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <GlobalStore initialStore={{
      isLoggedIn: false,
      isLoadingAuth: true,
      username: ''
    }}>
        <NextNProgress color="#dc2626" height={4} />
        <Component {...pageProps} />
    </GlobalStore>
  )
}
