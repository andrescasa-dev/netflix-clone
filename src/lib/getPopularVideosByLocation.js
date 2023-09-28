import { getYouTubeVideos } from './getYouTubeVideos'

export const getPopularVideosByLocation = async (coords) => {
  const [lat, lon] = coords // '%2C'
  const location = `${lat}%2C${lon}`
  if (!location || location === '') throw new Error('location param is required')
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${location}&locationRadius=10mi&order=viewCount&type=video&key=${process.env.YOUTUBE_API_KEY}`
  const videos = await getYouTubeVideos(url)
  return videos
}
