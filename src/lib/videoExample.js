import videoDetail from '../../data/videoDetail'
import YTCategories from '../../data/YTCategories.json'

export const getVideoDetailExample = () => {
  const videoItem = videoDetail.items[0]
  const { statistics, snippet, contentDetails } = videoItem
  const id = videoItem.id?.videoId || videoItem.id
  const { viewCount } = statistics
  const { description, publishedAt, channelTitle, title, thumbnails, categoryId } = snippet
  const { duration, definition, caption: hasCaption } = contentDetails
  return {
    title,
    id,
    description,
    channelTitle,
    definition,
    hasCaption,
    imgUrl: thumbnails.high.url,
    viewCount: parseViewCount(viewCount),
    publishTime: parsePublishedTime(publishedAt),
    duration: parseDuration(duration),
    category: parseCategory(categoryId)
  }
}

function parseDuration (duration) {
  const hours = duration.match(/\d+(?=H)/)
  const minutes = duration.match(/\d+(?=M)/)
  const hoursString = hours ? `${hours}h` : ''
  const minutesString = minutes ? `${minutes}min` : ''

  return `${hoursString}${minutesString}`
}

function parsePublishedTime (time) {
  const publishedDate = new Date(time)
  const parseOptions = { year: 'numeric', month: 'numeric' }
  return publishedDate.toLocaleDateString(process.env.NEXT_PUBLIC_LOCALITY, parseOptions)
}

function parseCategory (categoryId) {
  return YTCategories[categoryId]
}

function parseViewCount (views) {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return `${views}`
}
