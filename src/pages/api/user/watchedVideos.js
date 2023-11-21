import getWatchedVideoIdsByUser from '@/lib/database/getWatchedVideosByUser'
import checkUserAuth from '@/lib/ssr/checkUserAuth'
import { getVideosByIds } from '@/lib/vimeoLocalSDK'

export default async function (req, res) {
  if (req.method === 'GET') {
    try {
      const { userJWT } = checkUserAuth(req.cookies)
      const videoIds = await getWatchedVideoIdsByUser(userJWT)
      if (videoIds.length === 0) return res.status(200).send({ videos: [] })
      const videos = await getVideosByIds(videoIds)
      res.status(200).send({ videos })
    } catch (error) {
      res.status(500).send({ error: 'error while fetching api video provider' })
    }
  } else {
    res.status(405).send({ error: 'method is not allowed' })
  }
}
