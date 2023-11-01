export default function globalStoreReducer (store, action) {
  // store: {username, isLoading}
  const { type, payload } = action
  console.log(`executing: ${type}`)
  switch (type) {
    case 'finish_loading_auth' : {
      return { isLoading: false, username: payload.username }
    }
    default: throw new Error('no such a action type in global store reducer')
  }
}
