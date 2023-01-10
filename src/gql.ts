import { path } from 'ramda'

// @ts-ignore
const arweaveUrl = import.meta?.env?.ARWEAVE || 'https://arweave.net'

function run(data: { query: string, variables: Record<string, any> }): Promise<any> {
  return fetch(`${arweaveUrl}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.ok ? res.json() : Promise.reject(res))
    //.then(x => (console.log('result', x.data.errors), x))
    .then(x => {

      if (x.data.errors) {
        throw new Error(JSON.stringify(x.data.errors, null, 2))
      }
      return x
    })
    .then(path(['data', 'transactions']))
}

export async function gql(q: { query: string, variables: Record<string, any> }) {
  let hasNextPage = true;
  let edges: any[] = []
  let cursor = ""

  while (hasNextPage) {
    const result = await run({ query: q.query, variables: { ...q.variables, cursor } })

    if (result.edges && result.edges.length) {
      // @ts-ignore
      edges = edges.concat(result.edges)
      cursor = result.edges[result.edges.length - 1].cursor
    }
    hasNextPage = result.pageInfo.hasNextPage
  }

  return edges
}
