const fetchVimeo = async (url) => {
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

export default fetchVimeo
