import fetchGraphQL from './hasura'

const operationsDoc = `
  mutation CreateUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, public_address: $publicAddress}) {
      affected_rows
    }
  }
`

export default async function createUser (metadata, userJwt) {
  const { email, issuer, publicAddress } = metadata
  const variables = { email, issuer, publicAddress }
  const { errors, data } = await fetchGraphQL(operationsDoc, 'CreateUser', variables, userJwt)

  if (errors) {
    console.error(errors)
  }

  return data
}
