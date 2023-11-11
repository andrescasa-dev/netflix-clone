import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetLikedVideosByUser($userId:String!) {
    user_videos(where: {userId: {_eq: $userId}, likedStatus: {_eq: "1"}}) {
      videoId
    }
  }
`

export default async function getLikedVideoIdsByUser (variables, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetLikedVideosByUser', variables, userJwt)
  checkRequiredVariables(['userId'], variables, 'while GQL petition ')

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return data.user_videos
}
