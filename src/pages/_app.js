import GlobalStore from '@/stores/GlobalStore'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <GlobalStore initialStore={{
      isLoading: true,
      username: ''
    }}>
      <Component {...pageProps} />
    </GlobalStore>
  )
}
