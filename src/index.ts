import { gql } from './gql'
import { append, compose, prop, head, find, propEq, join, pluck, filter, reduce, sortBy, reject, map } from 'ramda'
import { AtomicAssetType } from './faces'

export default async function (id: string) {
  return get(id)
    .then(prop('groupId'))
    // @ts-ignore
    .then(getItemsByGroupId)
    .then(buildGraph)
}

function get(id: string) {
  return buildQuery(id)
    .then(gql)
    .then(compose(prop('node'), head))
    .then(toAssetItem)
}

function buildQuery(id: string) {
  return Promise.resolve({
    query: `query ($ids: [ID!], $cursor: String) {
      transactions(first: 1, after: $cursor, 
        ids: $ids) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            tags {
              name
              value
            }
          }
        }
      }
    }`,
    variables: {
      ids: [id]
    }
  })
}

function toAssetItem(node: any) {
  // console.log('node: ', node)
  const getTag = compose(prop('value'), n => find(propEq('name', n), node.tags))
  const published = getTag('Published') ? Number(getTag('Published')) : Date.now()
  // @ts-ignore
  const topics = join(', ', pluck('value', filter(t => /^Topic:/.test(t.name), node.tags)))
  return {
    id: node.id,
    type: getTag('Type'),
    title: getTag('Title'),
    description: getTag('Description'),
    metaId: getTag('META'),
    groupId: getTag('Group-Id'),
    forks: getTag('Forks'),
    published,
    stamps: 0,
    topics
  }
}

function buildGraph(items: AtomicAssetType[]) {
  function traverseGraph(children: Record<string, any>[], node: AtomicAssetType) {
    if (children && children.length > 0) {
      children.forEach((g: Record<string, any>) => {
        if (g.id === node.forks) {
          g.children = append({
            id: node.id,
            group: node.groupId,
            node: node,
            children: []
          }, g.children)
        } else {
          g.children = traverseGraph(g.children, node)
        }
      })
      return children
    } else {
      return []
    }
  }

  function createEdge(graph: Record<string, any>, node: AtomicAssetType) {
    if (node.forks === '') {
      graph.id = node.id,
        graph.group = node.groupId,
        graph.node = node
      graph.children = []
    } else {
      if (graph.id === node.forks) {
        graph.children = append({
          id: node.id,
          group: node.groupId,
          node: node,
          children: []
        }, graph.children)
      } else {
        graph.children = traverseGraph(graph.children, node)
      }
    }
    return graph
  }
  // @ts-ignore
  return compose(
    reduce(createEdge, {}),
    sortBy(prop('published')),
    reject(propEq('forks', undefined))
  )(items)
}

function getItemsByGroupId(groupId: string) {
  // get assetItems not data
  const query = `query ($groupIds: [String!]!, $cursor: String) {
      transactions(first: 100, after: $cursor, tags: [
        { name: "Group-Id", values: $groupIds }
       ]) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id 
            tags {
              name
              value
            }
          }
        }
      }
    }`

  return gql({
    query,
    variables: { groupIds: [groupId] }
  }).then(map(compose(
    toAssetItem,
    prop('node')
  )))
}