const fetchVimeo = async (url) => {
  const options = {
    headers: {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`
    }
  }
  const response = await fetch(url, options)
  console.log('fetching url: ', url)
  if (!response.ok) throw new Error(`Error fetching Vimeo API, response: ${response}`)
  const data = await response.json()
  return data
}

export default fetchVimeo
