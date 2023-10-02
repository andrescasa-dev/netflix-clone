import fetchGraphQL from './hasura'

const operationsDoc = `
  query GetVideoDataByUser($issuer: String!, $videoId: String!) {
    user_videos(where: {user_id: {_eq: $issuer}, video_id: {_eq: $videoId}}) {
      hasWatched
      id
      likedStatus
      user_id
      video_id
    }
  }
`

export default async function getVideoDataByUser (variables, userJwt) {
  const { issuer, videoId } = variables
  if (!issuer || !videoId) throw new Error('missing required variables for GQL petition')
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetVideoDataByUser', variables, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return data
}
