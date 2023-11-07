import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'
import variablesToGQLStringObj from './variablesToGQLStringObj'

const getOperationsDoc = (variables) => {
  const { videoId, userId, ...variablesToSet } = variables
  return `
  mutation MutateUserVideoData($videoId: String!, $userId: String!, $watchedAt: timestamptz, $likedStatus: numeric) {
    update_user_videos(
      where: {videoId: {_eq: $videoId}, userId: {_eq: $userId}}, 
      _set: ${variablesToGQLStringObj(variablesToSet)}) 
    {
      affected_rows
    }
  }
`
}

// options of variables: videoId, userId, likedStatus, hasWatched
export default async function mutateUserVideoData (variables, userJwt) {
  checkRequiredVariables(['videoId', 'userId'], variables)
  const { errors, data } = await fetchGraphQL(getOperationsDoc(variables), 'MutateUserVideoData', variables, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition MutateUserVideoData')
  }

  return data
}
