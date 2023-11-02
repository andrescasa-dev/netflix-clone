import jwt from 'jsonwebtoken'

export default function checkUserAuth (context) {
  // has the user a JWT?
  const userJWT = context.req.cookies?.token // could not exist

  // has the user a valid JWT (our JWT)?
  const JWTData = userJWT && jwt.verify(userJWT, process.env.JWT_SECRET_KEY)
  const userId = JWTData?.issuer
  const userEmail = JWTData?.email

  const isLoggedIn = Boolean(userEmail)

  // user properly login return correspondent values
  return { isLoggedIn, userEmail, userJWT, userId }
}
