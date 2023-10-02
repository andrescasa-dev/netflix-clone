import createUser from '@/lib/database/createUser'
import getUsersByIssuer from '@/lib/database/getUsersByIssuer'
import { magicAdmin } from '@/lib/magicServer'
import { setAuthCookie } from '@/lib/setAuthCookie'
import jwt from 'jsonwebtoken'

export default async function login (req, res) {
  if (req.method === 'POST') {
    try {
      // access user data
      const didToken = req.headers.authorization.slice(7)
      // unpack data from didToken
      const metadata = await magicAdmin.users.getMetadataByToken(didToken)
      // create a JWT to communicate with the user data in the DB
      const userJwt = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000), // ¿this should be the same as in DIDToken?
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60), // ¿this should be the same as in DIDToken?
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`
          }
        },
        process.env.JWT_SECRET_KEY
      )
      // maker a GQL query to DB to fetch the user i: need user id
      const { users: usersMatch } = await getUsersByIssuer(metadata.issuer, userJwt)
      const isUserInDB = usersMatch.length > 0

      if (isUserInDB) {
        // just save the user
        setAuthCookie(userJwt, res) // pass a cookie for de JWT of the logged user
      } else {
        // create and save the user
        setAuthCookie(userJwt, res) // pass a cookie for de JWT of the logged user
        await createUser(metadata, userJwt)
      }

      return res.status(200).json({ couldLogin: true })
    } catch (error) {
      console.error(`Something went wrong in login api: ${error.message} data: ${JSON.stringify(error.data)}`)
      return res.status(500).json({ couldLogin: false, error: "login doesn't works" })
    }
  } else {
    console.error('method not allowed')
    return res.status(405).json({ error: 'method not allowed' })
  }
}

// Get user
// if not: Put user
