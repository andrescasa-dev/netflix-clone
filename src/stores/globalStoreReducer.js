export default function globalStoreReducer (store, action) {
  // store: {username, isLoading}
  const { type, payload } = action
  console.log(`global store reducer, executing: ${type}`)
  switch (type) {
    case 'load_user' : {
      return { isLoadingAuth: false, username: payload.userEmail, isLoggedIn: payload.isLoggedIn }
    }
    case 'logout_user' : {
      return { isLoadingAuth: true, isLoggedIn: false, username: '' }
    }
    default: throw new Error('no such a action type in global store reducer')
  }
}
