import { getYouTubeVideos } from './getYouTubeVideos'

export const getVideosBySearch = async (searchParam) => {
  if (!searchParam || searchParam === '') throw new Error('search param is required')
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParam}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  const videos = await getYouTubeVideos(url)
  return videos
}
