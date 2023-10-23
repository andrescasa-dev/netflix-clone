export default function globalStoreReducer (store, action) {
  const { type, payload } = action
  console.log(`executing: ${type}`)
  switch (type) {
    case 'update_username' : {
      console.log('globalStore.username was updated')
      return { ...store, username: payload.username }
    }
    default: throw new Error('no such a action type in global store reducer')
  }
}
