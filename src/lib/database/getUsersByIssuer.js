import fetchGraphQL from './hasura'

const operationsDoc = `
      query GetUsersByIssuer ($issuer: String!) {
        users(where: {issuer: {_eq: $issuer}}) {
          id
          email
        }
      }
      
      mutation MyMutation {
        __typename
      }
    `

export default async function getUsersByIssuer (issuer, userJwt) {
  const { errors, data } = await fetchGraphQL(operationsDoc, 'GetUsersByIssuer', { issuer }, userJwt)

  if (errors) {
    console.error(errors)
  }

  return data
}
