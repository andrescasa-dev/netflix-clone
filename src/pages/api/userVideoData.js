import checkRequiredVariables from '@/lib/checkRequiredVaraibles'
import createUserVideoData from '@/lib/database/createUserVideoData'
import getVideoDataByUser from '@/lib/database/getVideoDataByUser'
import updateVideoData from '@/lib/database/updateUserVideoData'
import jwt from 'jsonwebtoken'

// need videoId
// user_video table must have a compuse PK with user_id and video_id, for not duplicated video data for the same user.
export default async function userVideoData (req, res) {
  try {
    const authToken = req.cookies.token
    // verify if the token is from ours
    const authDecode = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
    // if user is not login
    if (!authToken) { res.status(403).send({ }) }

    // needed data
    const { issuer } = authDecode
    const body = req.method === 'POST' && JSON.parse(req.body)
    const videoId = body ? body.videoId : req.query.videoId
    const { user_videos: userVideoDataArray } = await getVideoDataByUser({ issuer, videoId }, authToken)

    if (req.method === 'POST') {
      const { hasWatched, likedStatus } = body
      checkRequiredVariables(['videoId', 'hasWatched', 'likedStatus'], body, 'while getting http post userVideoData petition')

      // if there is not in the DB create userVideoData
      if (userVideoDataArray.length === 0) {
        // create
        const response = await createUserVideoData({ hasWatched, likedStatus, userId: issuer, videoId }, authToken)
        res.status(200).send({ done: true, data: response })
      }

      // update
      const response = await updateVideoData({ likedStatus, hasWatched, videoId, userId: issuer }, authToken)
      res.status(200).send({ done: true, data: response })
    }

    if (req.method === 'GET') {
      checkRequiredVariables(['videoId'], req.query, 'while getting http get userVideoData petition')

      // not found
      if (userVideoDataArray.length === 0) res.status(404).send({ done: true, userVideoData: userVideoDataArray })

      // found
      res.status(200).send({ done: true, userVideoData: userVideoDataArray[0] })
    }
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ error: 'something went wrong in user video data' })
  }

  return res.status(405).json({ error: 'method not allowed' })
}
