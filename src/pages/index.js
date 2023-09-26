import Head from 'next/head'
// eslint-disable-next-line camelcase
import { Roboto_Slab } from 'next/font/google'
import Hero from '@/components/molecules/Hero'
import Header from '@/components/organisms/Header'
import MoviesSection from '@/components/molecules/MoviesSection'

const robotSlab = Roboto_Slab({ subsets: ['latin'] })

export default function Home () {
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
        />
        <MoviesSection sizeOfCards='big' subtitle='subTitle'/>
        <MoviesSection sizeOfCards='mid' subtitle='subTitle'/>
        <MoviesSection sizeOfCards='small' subtitle='subTitle'/>
      </main>
    </>
  )
}
