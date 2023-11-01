import checkRequiredVariables from '../checkRequiredVaraibles'
import { getVideosByIdArray } from '../getVideosById'
import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetWatchedVideosByUser($userId: String!) {
    user_videos(where: {user_id: {_eq: $userId}, hasWatched: {_eq: true}}) {
      id
      video_id
    }
  }
`

export default async function getWatchedVideosByUser (variables, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetWatchedVideosByUser', variables, userJwt)
  checkRequiredVariables(['userId'], variables, 'while GQL petition ')

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return getVideosByIdArray(data.user_videos)
}
