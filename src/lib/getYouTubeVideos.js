import videos from '../../data/videos'

export const fetchVimeo = async (url) => {
  console.log('fetching url: ', url)
  const options = {
    headers: {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`
    }
  }
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Error fetching Vimeo API, response: ${response}`)
  const data = await response.json()
  return data
}

export const getYouTubeVideos = async () => {
  const minifiedVideosData = videos.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
      imgAlt: item.snippet.title
    }
  })
  return minifiedVideosData
}
