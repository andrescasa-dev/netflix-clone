import videoDetail from '../../data/videoDetail'

export const videoExample = () => {
  const snippet = videoDetail.items[0].snippet
  const id = videoDetail.items[0].id?.videoId || videoDetail.items[0].id
  return {
    title: snippet?.title,
    imgUrl: videoDetail.items[0].snippet.thumbnails.high.url,
    id,
    description: snippet.description,
    publishTime: snippet.publishedAt,
    channelTitle: snippet.channelTitle,
    viewCount: videoDetail.items[0].statistics.viewCount
  }
}

// const { title, description, publishDate, viewCount, channelTitle } = video
