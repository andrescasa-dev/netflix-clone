export default function globalStoreReducer (store, action) {
  // store: {username, isLoading}
  const { type, payload } = action
  console.log(`executing: ${type}`)
  switch (type) {
    case 'finish_loading_auth' : {
      return { isLoadingAuth: false, username: payload.username, isLoggedIn: Boolean(payload.username) }
    }
    case 'login_user' : {
      return { isLoadingAuth: false, username: payload.username, isLoggedIn: true }
    }
    case 'logout_user' : {
      return { isLoadingAuth: true, isLoggedIn: false }
    }
    default: throw new Error('no such a action type in global store reducer')
  }
}
