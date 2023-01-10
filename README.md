# Asset Graph Library

Browser library to query Atomic Assets Groups.

With the `GroupId` and the `Forks` tags we can create a graph or relationship between Atomic Assets, this library 
is built for the browser and allows developers to pull Asset Graphs from any child node TX_ID.

## Usage

```js
import graph from 'https://graph_permaweb.arweave.net'

async function main() {
  const tree = await graph('vCU8cXnxkkMupiACruf9ih2M4k_CWIEvGsozbY9jlzg')
}
```

## Graph Result Schema

```js
{
  id: 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g',
  group: 'GRAPH_TEST',
  node: {
    id: 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g',
    type: 'app',
    title: 'Graph App',
    description: 'Graph App test',
    metaId: '56tBv8cepFPTilFsdRdkvt3hGsfaUPGamyjjvn8gaKQ',
    groupId: 'GRAPH_TEST',
    forks: '',
    published: 1672760051294,
    stamps: 0,
    topics: 'test'
  },
  children: [
    {
      id: 'vCU8cXnxkkMupiACruf9ih2M4k_CWIEvGsozbY9jlzg',
      group: 'GRAPH_TEST',
      node: {
        id: 'vCU8cXnxkkMupiACruf9ih2M4k_CWIEvGsozbY9jlzg',
        type: 'app',
        title: 'Graph App v1',
        description: 'Graph App test',
        metaId: 'U1ECmaf3b_e7UaURYKCskTEXE3HVlCIV2F3nlFQiOwI',
        groupId: 'GRAPH_TEST',
        forks: 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g',
        published: 1672760053223,
        stamps: 0,
        topics: 'test'
      },
      children: []
    },
    {
      id: '09NKUMApRJqnFsfQLb33EbDmfCDjtVEIsolGkNVprgg',
      group: 'GRAPH_TEST',
      node: {
        id: '09NKUMApRJqnFsfQLb33EbDmfCDjtVEIsolGkNVprgg',
        type: 'app',
        title: 'Graph App v2',
        description: 'Graph App test',
        metaId: 'dlk9cum-R9rS66-z60E_kPVcUE4ktTQ4PKczHJlzQzo',
        groupId: 'GRAPH_TEST',
        forks: 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g',
        published: 1672760687935,
        stamps: 0,
        topics: 'test'
      },
      children: [{
        id: 'CVfUaxO723M5UoRbgLR97LMEDZtJEV4uwEaOreuRyvk',
        group: 'GRAPH_TEST',
        node: {
          id: 'CVfUaxO723M5UoRbgLR97LMEDZtJEV4uwEaOreuRyvk',
          type: 'app',
          title: 'Graph App v1_1',
          description: 'Graph App test',
          metaId: 'R5AMfIme7VEXUXUUX33Zxn7Y4rON2VszhYwZzrmzcGQ',
          groupId: 'GRAPH_TEST',
          forks: '09NKUMApRJqnFsfQLb33EbDmfCDjtVEIsolGkNVprgg',
          published: 1672762170200,
          stamps: 0,
          topics: 'test'
        },
        children: []
      }]
    }
  ]
}
```

## 
