import Header from '@/components/organisms/Header'
import { Head } from 'next/document'

export default function MoviePage () {
  return (
    <>
    <Head>
      <title>My Movie</title>
    </Head>
    <main >
      <Header />
    </main>
    </>
  )
}
