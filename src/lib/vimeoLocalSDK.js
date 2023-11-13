import formatDate from './formatDate'
import formatTime from './formatTime'
import getParamUri from './getParamUir'
import { fetchVimeo } from './getYouTubeVideos'

const minifyVimeoVideo = ({ uri, name, pictures }) => {
  return {
    id: uri.split('/')[2],
    imgAlt: name,
    title: name,
    imgUrl: pictures.base_link
  }
}

export const getVideosByIds = async (videos) => {
  if (process.env.NEXT_PUBLIC_ACTIVE_API === 'false') return []
  if (videos === undefined) throw new Error('videos param is required in getVideosByIds')
  const uriArr = videos.map(video => `/videos/${video.videoId}`)
  const queryParams = getParamUri({
    fields: ['uri', 'name', 'pictures'],
    page: 1,
    per_page: process.env.NEXT_PUBLIC_VIDEO_PER_PAGE,
    uris: uriArr
  })
  const url = `https://api.vimeo.com/videos?${queryParams}`
  const { data } = await fetchVimeo(url)
  // the petition of vimeo api altered the order of the videos. the uriArr are order by watchedAt
  const watchedVideosReordered = uriArr.map((uri) => {
    return data.find((video) => video.uri === uri)
  })
  const minifiedWatchedVideos = watchedVideosReordered.map(minifyVimeoVideo)
  return minifiedWatchedVideos
}

export const getVideosByCategory = async (category) => {
  if (process.env.NEXT_PUBLIC_ACTIVE_API === 'false') return []
  if (!category || category === '') throw new Error('category param is required')
  const queryParams = getParamUri({
    filter_embeddable: true,
    sort: 'relevant',
    fields: ['uri', 'name', 'pictures'],
    page: 1,
    per_page: process.env.NEXT_PUBLIC_VIDEO_PER_PAGE
  })
  const url = `https://api.vimeo.com/categories/${category}/videos?${queryParams}`
  const data = await fetchVimeo(url)
  const videos = data.data.map(minifyVimeoVideo)
  return videos
}

export const getPopularVideos = async () => {
  if (process.env.NEXT_PUBLIC_ACTIVE_API === 'false') return []
  const queryParams = getParamUri({
    direction: 'desc',
    filter: 'trending',
    sort: 'plays',
    page: 1,
    fields: ['uri', 'name', 'pictures'],
    per_page: process.env.NEXT_PUBLIC_VIDEO_PER_PAGE
  })
  const url = `https://api.vimeo.com/videos/?${queryParams}`
  const data = await fetchVimeo(url)
  const videos = data.data.map(minifyVimeoVideo)
  return videos
}

/* eslint-disable camelcase */
const detailMinifier = (video) => {
  const { uri, user, name, stats, release_time, categories, duration, content_rating_class, ...rest } = video
  return {
    id: uri.split('/')[2],
    title: name,
    publishTime: formatDate(release_time),
    channelTitle: user.name,
    category: categories,
    rating: content_rating_class,
    duration: formatTime(duration),
    ...rest
  }
}

export const getVideoDetail = async (id) => {
  console.log('getVideoDetail with id', id)
  if (process.env.NEXT_PUBLIC_ACTIVE_API === 'false') return []

  const queryParams = getParamUri({
    fields: ['uri', 'name', 'description', 'content_rating_class', 'release_time', 'duration', 'categories.name', 'user.name']
  })
  const url = `https://api.vimeo.com/videos/${id}?${queryParams}`
  const video = await fetchVimeo(url)
  return detailMinifier(video)
}
