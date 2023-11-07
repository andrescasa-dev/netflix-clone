import checkRequiredVariables from '../checkRequiredVaraibles'
import fetchGraphQL from './hasura'
import variablesToGQLStringObj from './variablesToGQLStringObj'

const getOperationsDoc = (variables) => {
  return `
  mutation CreateUserVideoData($watchedAt: timestamptz, $likedStatus: numeric, $userId: String!, $videoId: String! ) {
    insert_user_videos_one(object: ${variablesToGQLStringObj(variables)}){
      id
    }
  }
`
}

export default async function createUserVideoData (variables, userJwt) {
  checkRequiredVariables(['videoId', 'userId'], variables)
  const { errors, data } = await fetchGraphQL(getOperationsDoc(variables), 'CreateUserVideoData', variables, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition CreateUserVideoData')
  }

  return data
}
