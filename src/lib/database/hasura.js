/*
JWT link: https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InVzZXIgdGVzdCAxIiwiaWF0IjoxNjk2MTA5NzMzLCJleHAiOjE2OTY3MTQ0OTMsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiJpc3N1ZXIxIn19.Mk8o9CqsoagkADG7y7aw71u707LdjMLo-w-IAgR-Oqo
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InVzZXIgdGVzdCAxIiwiaWF0IjoxNjk2MTA5NzMzLCJleHAiOjE2OTY3MTQ0OTMsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiJpc3N1ZXIxIn19.Mk8o9CqsoagkADG7y7aw71u707LdjMLo-w-IAgR-Oqo
*/

async function fetchGraphQL (operationsDoc, operationName, variables) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_API_URL,
    {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
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

const operationsDoc = `
  query MyQuery {
    users {
      id
    }
  }
`

function fetchMyQuery () {
  return fetchGraphQL(
    operationsDoc,
    'MyQuery',
    {}
  )
}

export default async function startFetchMyQuery () {
  const { errors, data } = await fetchMyQuery()

  if (errors) {
    // handle those errors like a pro
    console.error(errors)
  }

  // do something great with this precious data
  console.log('hasura data: ', data)
}
