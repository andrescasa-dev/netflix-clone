import { getVideosByIdArray } from '../getVideosById'
import expireWatchedVideos from './expireWatchedVideos'
import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetWatchedVideosByUser {
    user_videos(order_by: {watchedAt: desc}, where: {watchedAt: {_is_null: false}}) {
      id
      videoId
    }
  }
`

export default async function getWatchedVideosByUser (userJwt) {
  const response = await expireWatchedVideos(userJwt)
  console.log('videos expired: ', response)
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetWatchedVideosByUser', {}, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return getVideosByIdArray(data.user_videos)
}
