/**
 * Actualiza la tabla user_videos siempre y cuando que los nombre de las variables en videoData coincidan con las variables en la base de datos
 * @example
 * const videoData = {
 *   video_id: '12345', // error la variable en la DB se llama videoId
 *   userId: 'user123',
 *   has_been_watched: true, // error la variable en la DB se llama hasWatched
 *   likedStatus: 1,
 *   // ... otros campos de datos
 * };
 */

const postUserVideoData = async (videoData) => {
  const response = await fetch('/api/updateUserVideoData', {
    method: 'POST',
    body: JSON.stringify(videoData)
  })
  const data = await response.json()
  console.log(data)
  return data
}

export default postUserVideoData
