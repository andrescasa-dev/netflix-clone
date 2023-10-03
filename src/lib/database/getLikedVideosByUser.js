import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetLikedVideosByUser($userId:String!) {
    user_videos(where: {user_id: {_eq: $userId}, likedStatus: {_eq: "1"}}) {
      video_id
    }
  }
`

export default async function getLikedVideosByUser (variables, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetLikedVideosByUser', variables, userJwt)
  checkRequiredVariables(['userId'], variables, 'while GQL petition ')

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return data.user_videos
}
