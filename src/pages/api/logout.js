import { expireAuthCookie } from '@/lib/expireAuthCookie'
import { magicAdmin } from '@/lib/magicServer'
import jwt from 'jsonwebtoken'

export default async function logout (req, res) {
  try {
    const userJWT = req.cookies.token
    if (!userJWT) { res.status(401).send({ couldLogout: false, message: 'user is not login' }) }
    const { issuer } = jwt.verify(userJWT, process.env.JWT_SECRET_KEY)
    await magicAdmin.users.logoutByIssuer(issuer)
    expireAuthCookie(res)
    res.writeHead(302, { Location: '/login' })
    res.end()
  } catch (error) {
    console.error(`something went wrong, api logout. Error: ${error.message}`)
    res.status(500).send({ })
  }
}
