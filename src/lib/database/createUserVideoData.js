import fetchGraphQL from './hasura'

const operationsDoc = `
  mutation CreateUserVideoData($hasWatched: Boolean!, $likedStatus: numeric!, $userId: String!, $videoId: String! ) {
    insert_user_videos_one(object: {hasWatched: $hasWatched, likedStatus: $likedStatus, user_id: $userId, video_id: $videoId}) {
      id
    }
  }
`

const checkRequiredVariables = (requiredVariables, variables) => {
  const missingVariables = requiredVariables.filter(key => typeof variables[key] === 'undefined')

  if (missingVariables.length > 0) {
    throw new Error(`missing the next required variables: ${missingVariables.join(', ')}`)
  }
}

export default async function createUserVideoData (variables, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'CreateUserVideoData', variables, userJwt)
  checkRequiredVariables(['hasWatched', 'likedStatus', 'videoId', 'userId'], variables)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition')
  }

  return data
}
