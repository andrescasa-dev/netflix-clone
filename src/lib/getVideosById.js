import videos from '../../data/videos'

export const getVideosByIdArray = (videosIdArray) => {
  // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
  // const videoRowData = await getYouTubeVideos(url)
  // const video = minifyVideo(videoRowData)
  const exampleVideosArray = videos.items

  const foundVideos = videosIdArray.map((userVideo) => {
    const { videoId } = userVideo
    if (!videoId || videoId === '') throw new Error('id param is required')
    const videoFound = exampleVideosArray.find((videoExample) => videoExample.id.videoId === videoId)

    if (!videoFound) {
      console.error(`Video with ID ${videoId} not found`)
      return {}
    }

    return {
      title: videoFound.snippet.title,
      imgUrl: videoFound.snippet.thumbnails.high.url, // or use https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg
      id: videoFound.id.videoId,
      imgAlt: videoFound.snippet.title
    }
  })

  return foundVideos
}
