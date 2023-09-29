import { Magic } from 'magic-sdk'

const createMagic = () => {
  return (
    typeof window !== 'undefined' &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY, { testMode: true })
  )
}

const magic = createMagic()

export default magic
