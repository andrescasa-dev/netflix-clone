export default async function fetchGraphQL (operationsDoc, operationName, variables, userJwt) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_API_URL,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userJwt}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables,
        operationName
      })
    }
  )

  return await result.json()
}
