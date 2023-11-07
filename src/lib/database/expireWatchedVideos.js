import fetchGraphQL from './hasura'

const operationsDoc = `
  mutation ExpireWatchedVideos($lessThan: timestamptz = "") {
    update_user_videos(
      where: {watchedAt: {_lt: $lessThan}}, 
      _set: {watchedAt: null}) {
      affected_rows
    }
  }
`

export default async function expireWatchedVideos (userJwt) {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 1)
  const lessThan = currentDate.toISOString()
  const { errors, data } = await fetchGraphQL(operationsDoc, 'ExpireWatchedVideos', { lessThan }, userJwt)

  if (errors) {
    console.error(errors)
    throw new Error('Error while executing GQL petition ExpireWatchedVideos')
  }
  return data
}
