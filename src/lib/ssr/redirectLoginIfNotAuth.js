import jwt from 'jsonwebtoken'

export default function redirectLoginIfNotAuth (context) {
  const redirectResponse = {
    props: {},
    redirect: {
      destination: '/login',
      permanent: false
    }
  }

  // is the user login?
  const userJWT = context.req.cookies.token // could not exist
  if (!userJWT) { return { redirectResponse } }

  // has the user a valid JWT?
  const { issuer: userId } = jwt.verify(userJWT, process.env.JWT_SECRET_KEY)
  if (!userId) {
    return { redirectResponse }
  }

  // user properly login return correspondent values
  return { userId, userJWT }
}
