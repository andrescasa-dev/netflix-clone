import { getVideoDetail } from '@/lib/vimeoLocalSDK'

export default async function (req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const video = await getVideoDetail(id)
      res.status(200).send({ video })
    } catch (error) {
      res.status(500).send({ error: 'error while fetching api video provider' })
    }
  } else {
    res.status(405).send({ error: 'method is not allowed' })
  }
}
