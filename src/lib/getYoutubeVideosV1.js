// eg option {
//   actionType: 'videosBySearch',
//   param: {
//     search: 'mySearch'
//   }
// }
export const getYouTubeVideosV1 = async (options) => {
  const getUrlVideosBySearch = () => {
    const { search } = options.param
    if (!search || search === '') throw new Error('search param is required')
    return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  }

  const getUrlPopularVideosByLocation = () => {
    const { location } = options.param
    if (!location || location === '') throw new Error('location param is required')
    return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${location}&locationRadius=10mi&order=viewCount&type=video&key=${process.env.YOUTUBE_API_KEY}`
  }

  const getUrlMap = {
    videosBySearch: getUrlVideosBySearch,
    popularVideosByLocation: getUrlPopularVideosByLocation
  }

  const getHttpUrl = getUrlMap[options.actionType]
  const response = await fetch(getHttpUrl())
  const rowVideosData = await response.json()
  if (rowVideosData?.error) {
    const { error } = rowVideosData
    throw new Error(`fetching error, status code ${error.code}, message: ${error.message}, error: ${JSON.stringify(error)}`)
  }

  const minifiedVideosData = rowVideosData.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
      imgAlt: item.snippet.title
    }
  })
  return minifiedVideosData
}
