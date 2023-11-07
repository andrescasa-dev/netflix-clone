import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetVideoDataByUser($userId: String!, $videoId: String!) {
    user_videos(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      watchedAt
      id
      likedStatus
      userId
      videoId
    }
  }
`

export default async function queryUserVideoData (variables, userJwt) {
  checkRequiredVariables(['videoId', 'userId'], variables)
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetVideoDataByUser', variables, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition GetVideoDataByUser')
  }

  return data.user_videos[0] ?? {}
}
