import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'

const operationsDoc = `
  mutation UpdateVideoData($videoId: String!, $hasWatched: Boolean!, $likedStatus: numeric!, $userId: String!) {
    update_user_videos(where: {video_id: {_eq: $videoId}, user_id: {_eq: $userId}}, _set: {hasWatched: $hasWatched, likedStatus: $likedStatus}) {
      affected_rows
    }
  }
`

export default async function updateVideoData (variables, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'UpdateVideoData', variables, userJwt)
  checkRequiredVariables(['videoId', 'userId'], variables, 'while GQL petition ')

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return data
}
