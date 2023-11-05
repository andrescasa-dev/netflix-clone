import createUserVideoData from '@/lib/database/createUserVideoData'
import mutateUserVideoData from '@/lib/database/mutateUserVideoData'
import queryUserVideoData from '@/lib/database/queryUserVideoData'
import checkUserAuth from '@/lib/ssr/checkUserAuth'

// need videoId
// user_video table must have a compuse PK with userID and videoId, for not duplicated video data for the same user.
export default async function updateUserVideoData (req, res) {
  try {
    const { userJWT, userId, isLoggedIn } = checkUserAuth(req.cookies)
    if (!isLoggedIn) { res.status(403).send({ message: 'the user is not logged in' }) }
    if (req.method === 'POST') {
      const body = JSON.parse(req.body)
      const videoData = await queryUserVideoData({ userId, videoId: body.videoId }, userJWT)

      if (Object.keys(videoData).length === 0) {
        const response = await createUserVideoData({ ...body, userId }, userJWT)
        res.status(200).send({ done: true, data: response })
      } else {
        const response = await mutateUserVideoData({ ...body, userId }, userJWT)
        res.status(200).send({ done: true, data: response })
      }
    } else {
      return res.status(405).json({ error: 'method not allowed' })
    }
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ error: 'something went wrong in user video data' })
  }
}
