const getParamUri = (params) => {
  const entries = Object.entries(params)
  const uri = entries.reduce((uri, [key, value]) => {
    return uri + `${key}=${String(value)}&`
  }, '')
  return uri.slice(0, -1)
}

export default getParamUri
