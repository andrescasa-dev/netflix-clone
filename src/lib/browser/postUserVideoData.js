/**
 * Updates the user_videos table as long as the variable names in videoData match the variables in the database.
 * @example
 * const videoData = {
 *   video_id: '12345', // error the variable in the DB is called videoId
 *   userId: 'user123',
 *   has_been_watched: true, // error the variable in the DB is called watchedAt and is a timestamp
 *   likedStatus: 1,
 *   // ...
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
