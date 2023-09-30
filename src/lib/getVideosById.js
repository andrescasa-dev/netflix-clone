import { videoExample } from './videoExample'

export const getVideosById = async (id) => {
  if (!id || id === '') throw new Error('id param is required')
  // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
  // const videoRowData = await getYouTubeVideos(url)
  // const video = minifyVideo(videoRowData)
  const video = videoExample()
  return video
}
