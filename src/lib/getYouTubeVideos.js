export const getYouTubeVideos = async (url) => {
  const response = await fetch(url)
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
