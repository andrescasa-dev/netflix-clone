/* Todo
1. ¿How to delete a cookie?
2. ¿How to use magic.logout in server?
implementation
0. create the api
1. magic logout
2. delete the cookie
    serialize token: undefined. Establecer el expere a Date.now() o Date(1)
3. make the call in the frontend
*/
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
