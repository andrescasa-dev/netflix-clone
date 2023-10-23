import magic from '@/lib/magicClient'

export default async function useG () {
  try {
    const { email } = await magic.user.getMetadata()
    return !email ? '' : email
  } catch (error) {
    console.log('Error retrieving email:', error)
  }
}
