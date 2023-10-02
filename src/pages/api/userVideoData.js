import checkRequiredVariables from '@/lib/checkRequiredVaraibles'
import createUserVideoData from '@/lib/database/createUserVideoData'
import getVideoDataByUser from '@/lib/database/getVideoDataByUser'
import updateVideoData from '@/lib/database/updateUserVideoData'
import jwt from 'jsonwebtoken'

// need videoId
// user_video table must have a compuse PK with user_id and video_id, for not duplicated video data for the same user.
export default async function userVideoData (req, res) {
  const authToken = req.cookies.token
  try {
    // if user is not login
    if (!authToken) { res.status(403).send({ }) }

    if (req.method === 'POST') {
      const body = JSON.parse(req.body)
      const { videoId, hasWatched, likedStatus } = body
      checkRequiredVariables(['videoId', 'hasWatched', 'likedStatus'], body, 'while getting http post userVideoData petition')

      // verify if the token is ours
      const authDecode = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
      const { issuer } = authDecode

      // is there data user video in DB ?
      const { user_videos: userVideoDataArray } = await getVideoDataByUser({ issuer, videoId }, authToken)

      // if there is not in the DB create userVideoData
      if (userVideoDataArray.length === 0) {
        const response = await createUserVideoData({ hasWatched, likedStatus, userId: issuer, videoId }, authToken)
        res.status(200).send({ done: true, data: response })
      }

      const response = await updateVideoData({ likedStatus, hasWatched, videoId, userId: issuer }, authToken)
      res.status(200).send({ done: true, data: response })
    }
    if (req.method === 'GET') {
      const { videoId } = req.query
      checkRequiredVariables(['videoId'], req.query, 'while getting http get userVideoData petition')
      // verify if the token is ours
      const authDecode = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
      const { issuer } = authDecode

      // get data from DB
      const { user_videos: userVideoDataArray } = await getVideoDataByUser({ issuer, videoId }, authToken)

      if (userVideoDataArray.length === 0) res.status(404).send({ done: true, userVideoData: userVideoDataArray })
      res.status(200).send({ done: true, userVideoData: userVideoDataArray[0] })
    }
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ error: 'something went wrong in user video data' })
  }

  return res.status(405).json({ error: 'method not allowed' })
}
