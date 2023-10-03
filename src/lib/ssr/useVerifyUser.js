import jwt from 'jsonwebtoken'

export default function redirectLoginIfNotAuth (context) {
  const userJWT = context.req.cookies.token // could not exist
  const { issuer: userId } = jwt.verify(userJWT, process.env.JWT_SECRET_KEY)
  const redirectResponse = {
    props: {},
    redirect: {
      destination: '/login',
      permanent: false
    }
  }

  if (userJWT && userId) {
    return { userId, userJWT }
  }
  return { redirectResponse }
}
