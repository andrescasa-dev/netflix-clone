import GlobalStore from '@/stores/GlobalStore'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <GlobalStore initialStore={{
      isLoggedIn: false,
      isLoadingAuth: true,
      username: ''
    }}>
      <Component {...pageProps} />
    </GlobalStore>
  )
}
