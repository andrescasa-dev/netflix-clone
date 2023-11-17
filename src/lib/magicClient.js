import { Magic } from 'magic-sdk'

const createMagic = () => {
  const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY)
  if (magic) {
    magic.preload().then(() => console.log('Magic <iframe> loaded.'))
  }
  return magic
}

const magic = createMagic()

export default magic
